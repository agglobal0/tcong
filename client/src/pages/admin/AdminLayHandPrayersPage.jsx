import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminLayHandPrayersPage = () => {
  const { addToast } = useToast();
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  const fetchPrayers = () => {
    setLoading(true);
    api.admin
      .getPrayers('?type=lay_hand')
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setPrayers(list);
      })
      .catch((err) => {
        console.error('Failed to fetch lay hand prayers:', err);
        addToast(err?.message || 'Failed to load lay hand prayer requests', 'error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.admin.updatePrayer(id, { status });
      const label = status === 'done' ? 'Done' : 'Not Done';
      addToast(`Status updated to ${label}`, 'success');
      setPrayers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
      if (selectedPrayer && selectedPrayer.id === id) {
        setSelectedPrayer((prev) => ({ ...prev, status }));
      }
    } catch (err) {
      addToast(err.message || 'Failed to update prayer status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lay hand prayer submission?')) return;
    try {
      await api.admin.deletePrayer(id);
      addToast('Lay hand prayer request deleted', 'info');
      setPrayers((prev) => prev.filter((p) => p.id !== id));
      if (selectedPrayer && selectedPrayer.id === id) {
        setSelectedPrayer(null);
      }
    } catch (err) {
      addToast(err.message || 'Failed to delete prayer request', 'error');
    }
  };

  const openDetailsModal = async (prayer) => {
    setSelectedPrayer(prayer);
    setNewNote('');
    // Optionally fetch complete record with notes
    try {
      const res = await api.get(`/admin/prayer-requests/${prayer.id}`);
      if (res && res.data) {
        setSelectedPrayer(res.data);
      }
    } catch (e) {
      console.warn('Could not fetch notes:', e);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedPrayer) return;

    setSubmittingNote(true);
    try {
      await api.admin.addPrayerNote(selectedPrayer.id, newNote.trim());
      addToast('Care note added successfully', 'success');
      setNewNote('');
      // Reload details
      const res = await api.get(`/admin/prayer-requests/${selectedPrayer.id}`);
      if (res && res.data) {
        setSelectedPrayer(res.data);
      }
    } catch (err) {
      addToast(err.message || 'Failed to add note', 'error');
    } finally {
      setSubmittingNote(false);
    }
  };

  // Helper to check if status is "Done"
  const isDone = (status) => {
    if (!status) return false;
    const s = String(status).toLowerCase();
    return s === 'done' || s === 'prayed' || s === 'closed';
  };

  // Helper to parse Attendance from request_text if present
  const parsePrayerInfo = (text) => {
    if (!text) return { attendance: 'Unknown', details: '' };
    const attendanceMatch = text.match(/Attendance:\s*(.+)/i);
    const detailsMatch = text.match(/Prayer Details:\s*([\s\S]+)/i);

    return {
      attendance: attendanceMatch ? attendanceMatch[1].trim() : 'Service Request',
      isInPerson: attendanceMatch ? attendanceMatch[1].toLowerCase().includes('in-person') : false,
      details: detailsMatch ? detailsMatch[1].trim() : text.replace(/\[LAYING ON OF HANDS REQUEST\]/i, '').trim(),
    };
  };

  // Format clean phone number for WhatsApp link
  const getWhatsAppLink = (phone) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/[^\d+]/g, '').replace('+', '');
    return `https://wa.me/${cleanPhone}`;
  };

  // Strict check if item is a Lay Hand prayer request
  const isLayHandRequest = (p) => {
    if (p.type === 'lay_hand') return true;
    const text = (p.request_text || '').toUpperCase();
    return text.includes('LAYING ON OF HANDS') || text.includes('ATTENDANCE:');
  };

  // Only consider lay hand prayers for this page
  const layHandPrayers = prayers.filter(isLayHandRequest);

  // Filtered prayers
  const filteredPrayers = layHandPrayers.filter((p) => {
    const info = parsePrayerInfo(p.request_text);
    
    // Search match
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.email && p.email.toLowerCase().includes(q)) ||
      (p.phone && p.phone.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.request_text && p.request_text.toLowerCase().includes(q));

    // Status filter: only "done" vs "not_done"
    let matchesStatus = true;
    if (statusFilter === 'done') {
      matchesStatus = isDone(p.status);
    } else if (statusFilter === 'not_done') {
      matchesStatus = !isDone(p.status);
    }

    // Attendance filter
    let matchesAttendance = true;
    if (attendanceFilter === 'in_person') {
      matchesAttendance = info.isInPerson;
    } else if (attendanceFilter === 'phone') {
      matchesAttendance = !info.isInPerson;
    }

    // Category filter
    const matchesCategory =
      categoryFilter === 'all' || (p.category || '').toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesAttendance && matchesCategory;
  });

  // KPI calculations
  const totalCount = layHandPrayers.length;
  const inPersonCount = layHandPrayers.filter((p) => parsePrayerInfo(p.request_text).isInPerson).length;
  const notDoneCount = layHandPrayers.filter((p) => !isDone(p.status)).length;
  const doneCount = layHandPrayers.filter((p) => isDone(p.status)).length;

  return (
    <div className="admin-lay-hand-prayers">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-primary-subtle text-primary fs-6 px-3 py-1 rounded-pill">
              <i className="fas fa-hand-holding-heart me-1"></i> Sunday Healing Ministry
            </span>
          </div>
          <h3 className="fw-bold mb-1">Lay Hand Prayer Submissions</h3>
          <p className="text-muted small mb-0">
            All requests & registrations submitted via the Laying on of Hands healing prayer form
          </p>
        </div>
        <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={fetchPrayers}>
          <i className="fas fa-sync-alt me-1"></i> Refresh List
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <span className="text-muted small fw-semibold text-uppercase">Total Lay Hand Requests</span>
            <h3 className="fw-bold text-primary mb-0 mt-2">{totalCount}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <span className="text-muted small fw-semibold text-uppercase">In-Person Attendees</span>
            <h3 className="fw-bold text-success mb-0 mt-2">
              <i className="fas fa-church me-1 fs-5"></i> {inPersonCount}
            </h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <span className="text-muted small fw-semibold text-uppercase">Not Done (Pending)</span>
            <h3 className="fw-bold text-danger mb-0 mt-2">
              <i className="fas fa-clock me-1 fs-5"></i> {notDoneCount}
            </h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <span className="text-muted small fw-semibold text-uppercase">Done (Completed)</span>
            <h3 className="fw-bold text-success mb-0 mt-2">
              <i className="fas fa-check-circle me-1 fs-5"></i> {doneCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <div className="row g-2 align-items-center">
          <div className="col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search by name, phone, email, details..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="btn btn-light btn-sm" onClick={() => setSearch('')}>
                  <i className="fas fa-times text-muted"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-6 col-md-2">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="not_done">Not Done</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
            >
              <option value="all">All Attendance Types</option>
              <option value="in_person">In-Person (Coolaroo VIC)</option>
              <option value="phone">Phone / Intercessory</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Healing Focuses</option>
              <option value="health">Health & Healing</option>
              <option value="spiritual">Spiritual Deliverance</option>
              <option value="family">Family & Children</option>
              <option value="financial">Financial Breakthrough</option>
              <option value="career">Career & Visa</option>
              <option value="other">Other Need</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 bg-white">
          <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
            <table className="table table-hover align-middle mb-0 w-100">
              <thead className="bg-light">
                <tr>
                  <th className="ps-3 ps-md-4" style={{ minWidth: '160px' }}>Submitted By</th>
                  <th style={{ minWidth: '130px' }}>Attendance</th>
                  <th style={{ minWidth: '105px' }}>Healing Focus</th>
                  <th style={{ minWidth: '150px' }}>Prayer Need</th>
                  <th style={{ minWidth: '95px' }}>Date</th>
                  <th style={{ minWidth: '115px' }}>Status</th>
                  <th className="text-end pe-3 pe-md-4" style={{ minWidth: '110px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrayers.length > 0 ? (
                  filteredPrayers.map((p) => {
                    const info = parsePrayerInfo(p.request_text);
                    const waLink = getWhatsAppLink(p.phone);

                    return (
                      <tr key={p.id}>
                        {/* Submitted By */}
                        <td className="ps-3 ps-md-4">
                          <div className="fw-semibold text-dark">{p.name || 'Visitor'}</div>
                          {p.phone && (
                            <div className="small text-muted d-flex align-items-center gap-1 mt-1">
                              <i className="fas fa-phone-alt text-primary" style={{ fontSize: '0.75rem' }}></i>
                              <a href={`tel:${p.phone}`} className="text-decoration-none text-muted">
                                {p.phone}
                              </a>
                              {waLink && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-success ms-1"
                                  title="Chat on WhatsApp"
                                >
                                  <i className="fab fa-whatsapp"></i>
                                </a>
                              )}
                            </div>
                          )}
                          {p.email && (
                            <div className="small text-muted d-block text-truncate" style={{ maxWidth: '160px' }}>
                              <a href={`mailto:${p.email}`} className="text-decoration-none text-muted">
                                <i className="fas fa-envelope me-1" style={{ fontSize: '0.75rem' }}></i>
                                {p.email}
                              </a>
                            </div>
                          )}
                        </td>

                        {/* Attendance */}
                        <td>
                          {info.isInPerson ? (
                            <span className="badge bg-success-subtle text-success border border-success-subtle py-1 px-2 rounded-pill text-nowrap">
                              <i className="fas fa-church me-1"></i> In-Person (Coolaroo)
                            </span>
                          ) : (
                            <span className="badge bg-info-subtle text-info border border-info-subtle py-1 px-2 rounded-pill text-nowrap">
                              <i className="fas fa-phone me-1"></i> Phone / Distance
                            </span>
                          )}
                        </td>

                        {/* Healing Focus / Category */}
                        <td>
                          <span className="badge bg-primary-subtle text-primary text-uppercase px-2 py-1 rounded-pill">
                            {p.category || 'Health'}
                          </span>
                        </td>

                        {/* Prayer Need */}
                        <td>
                          <div
                            className="small text-dark text-truncate"
                            style={{ maxWidth: '220px', cursor: 'pointer' }}
                            onClick={() => openDetailsModal(p)}
                            title={info.details}
                          >
                            {info.details || p.request_text}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="small text-muted text-nowrap">
                          {p.created_at ? new Date(p.created_at).toLocaleDateString() : 'Recent'}
                        </td>

                        {/* Status dropdown: ONLY Done or Not Done */}
                        <td>
                          <select
                            className={`form-select form-select-sm fw-bold ${
                              isDone(p.status)
                                ? 'text-success border-success-subtle bg-success-subtle'
                                : 'text-danger border-danger-subtle bg-danger-subtle'
                            }`}
                            style={{ minWidth: '110px' }}
                            value={isDone(p.status) ? 'done' : 'not_done'}
                            onChange={(e) => handleStatusChange(p.id, e.target.value)}
                          >
                            <option value="not_done">Not Done</option>
                            <option value="done">Done</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="text-end pe-3 pe-md-4 text-nowrap">
                          <button
                            className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1 me-1"
                            onClick={() => openDetailsModal(p)}
                            title="View full details & care notes"
                          >
                            <i className="fas fa-eye me-1"></i> View
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1"
                            onClick={() => handleDelete(p.id)}
                            title="Delete submission"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-5">
                      <div className="py-4">
                        <i className="fas fa-hand-holding-heart fa-3x text-muted mb-3 d-block opacity-50"></i>
                        <h5>No Lay Hand prayer submissions found</h5>
                        <p className="small text-muted mb-0">
                          {search || statusFilter !== 'all' || attendanceFilter !== 'all' || categoryFilter !== 'all'
                            ? 'Try resetting your search or filter options.'
                            : 'New submissions from the Sunday service form will show up right here.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details & Notes Modal */}
      {selectedPrayer && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white p-3 px-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-hand-holding-heart fs-5"></i>
                  <h5 className="modal-title fw-bold mb-0">Lay Hand Prayer Details</h5>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedPrayer(null)}
                ></button>
              </div>

              <div className="modal-body p-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                {/* Person Information */}
                <div className="card bg-light border-0 rounded-3 p-3 mb-3">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="small text-muted mb-1">Full Name</div>
                      <div className="fw-bold fs-6 text-dark">{selectedPrayer.name || 'Anonymous / Visitor'}</div>
                    </div>
                    <div className="col-sm-6">
                      <div className="small text-muted mb-1">Healing Category</div>
                      <span className="badge bg-primary-subtle text-primary text-uppercase px-2 py-1">
                        {selectedPrayer.category || 'Health'}
                      </span>
                    </div>

                    <div className="col-sm-6">
                      <div className="small text-muted mb-1">Phone / WhatsApp</div>
                      <div className="fw-semibold">
                        {selectedPrayer.phone ? (
                          <div className="d-flex flex-wrap align-items-center gap-2">
                            <a href={`tel:${selectedPrayer.phone}`} className="text-decoration-none text-primary">
                              <i className="fas fa-phone-alt me-1"></i> {selectedPrayer.phone}
                            </a>
                            {getWhatsAppLink(selectedPrayer.phone) && (
                              <a
                                href={getWhatsAppLink(selectedPrayer.phone)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-xs btn-success py-1 px-2 rounded-pill small"
                                style={{ fontSize: '0.75rem' }}
                              >
                                <i className="fab fa-whatsapp me-1"></i> WhatsApp
                              </a>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted">Not provided</span>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="small text-muted mb-1">Email</div>
                      <div className="fw-semibold text-break">
                        {selectedPrayer.email ? (
                          <a href={`mailto:${selectedPrayer.email}`} className="text-decoration-none text-primary">
                            <i className="fas fa-envelope me-1"></i> {selectedPrayer.email}
                          </a>
                        ) : (
                          <span className="text-muted">Not provided</span>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="small text-muted mb-1">Attendance Mode</div>
                      <div>
                        {parsePrayerInfo(selectedPrayer.request_text).isInPerson ? (
                          <span
                            className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill text-wrap text-start"
                            style={{ whiteSpace: 'normal', lineHeight: '1.4' }}
                          >
                            <i className="fas fa-church me-1"></i> Attending Sunday Service In-Person (Coolaroo VIC)
                          </span>
                        ) : (
                          <span
                            className="badge bg-info-subtle text-info border border-info-subtle px-3 py-2 rounded-pill text-wrap text-start"
                            style={{ whiteSpace: 'normal', lineHeight: '1.4' }}
                          >
                            <i className="fas fa-phone me-1"></i> Requesting Phone / Intercessory Prayer
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="small text-muted mb-1">Submitted Date & Time</div>
                      <div className="fw-semibold text-dark">
                        <i className="fas fa-calendar-alt text-muted me-1"></i>
                        {selectedPrayer.created_at
                          ? new Date(selectedPrayer.created_at).toLocaleString()
                          : 'Recent'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Prayer Request Body */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-dark mb-1">Prayer & Healing Need Details</label>
                  <div
                    className="p-3 bg-white border rounded-3 text-secondary"
                    style={{ whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: '1.6' }}
                  >
                    {parsePrayerInfo(selectedPrayer.request_text).details || selectedPrayer.request_text}
                  </div>
                </div>

                {/* Status Quick Changer: ONLY Done or Not Done */}
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-4">
                  <span className="fw-bold text-dark small">Workflow Status:</span>
                  <select
                    className={`form-select form-select-sm w-auto fw-bold ${
                      isDone(selectedPrayer.status)
                        ? 'text-success border-success-subtle bg-success-subtle'
                        : 'text-danger border-danger-subtle bg-danger-subtle'
                    }`}
                    value={isDone(selectedPrayer.status) ? 'done' : 'not_done'}
                    onChange={(e) => handleStatusChange(selectedPrayer.id, e.target.value)}
                  >
                    <option value="not_done">Not Done</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {/* Ministry & Care Notes Thread */}
                <div className="border-top pt-3">
                  <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="fas fa-sticky-note text-warning"></i> Ministry Care Notes
                  </h6>

                  {/* Notes List */}
                  {selectedPrayer.notes && selectedPrayer.notes.length > 0 ? (
                    <div className="d-flex flex-column gap-2 mb-3">
                      {selectedPrayer.notes.map((n) => (
                        <div key={n.id} className="p-3 bg-light border-start border-3 border-primary rounded-2">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="fw-semibold small text-primary">{n.author_name || 'Admin / Pastor'}</span>
                            <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                              {new Date(n.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="small mb-0 text-dark" style={{ whiteSpace: 'pre-line' }}>{n.note}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted small mb-3">No internal care notes recorded yet.</p>
                  )}

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote}>
                    <div className="input-group">
                      <textarea
                        className="form-control form-control-sm"
                        placeholder="Add internal pastor / intercessor note..."
                        rows="2"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      ></textarea>
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm px-3"
                        disabled={submittingNote || !newNote.trim()}
                      >
                        {submittingNote ? 'Saving...' : 'Add Note'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="modal-footer bg-light p-3">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm rounded-pill px-4"
                  onClick={() => setSelectedPrayer(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayHandPrayersPage;
