import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminPrayersPage = () => {
  const { addToast } = useToast();
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  const fetchPrayers = () => {
    setLoading(true);
    api.admin
      .getPrayers('?type=prayer_request')
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setPrayers(list);
      })
      .catch((err) => {
        console.error('Failed to fetch prayers:', err);
        addToast(err?.message || 'Failed to load prayer requests', 'error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.admin.updatePrayer(id, { status });
      addToast(`Prayer status updated to ${status.toUpperCase()}`, 'success');
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
    if (!window.confirm('Are you sure you want to delete this prayer request?')) return;
    try {
      await api.admin.deletePrayer(id);
      addToast('Prayer request deleted', 'info');
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
    try {
      const res = await api.get(`/admin/prayer-requests/${prayer.id}`);
      if (res && res.data) {
        setSelectedPrayer(res.data);
      }
    } catch (e) {
      console.warn('Could not fetch prayer notes:', e);
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

  // Strict check to only include general prayer requests (exclude Lay Hand requests)
  const isGeneralPrayerRequest = (p) => {
    if (p.type === 'lay_hand') return false;
    const text = (p.request_text || '').toUpperCase();
    if (text.includes('LAYING ON OF HANDS') || text.includes('ATTENDANCE:')) return false;
    return true;
  };

  // Only consider general prayer requests for this page
  const generalPrayers = prayers.filter(isGeneralPrayerRequest);

  // Filtered prayers
  const filteredPrayers = generalPrayers.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.email && p.email.toLowerCase().includes(q)) ||
      (p.phone && p.phone.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.request_text && p.request_text.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === 'all' || (p.status || 'new').toLowerCase() === statusFilter.toLowerCase();

    const matchesCategory =
      categoryFilter === 'all' || (p.category || '').toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalCount = generalPrayers.length;
  const pendingCount = generalPrayers.filter(
    (p) => (p.status || 'new').toLowerCase() === 'new' || (p.status || '').toLowerCase() === 'assigned'
  ).length;
  const inPrayerCount = generalPrayers.filter((p) => (p.status || '').toLowerCase() === 'in_prayer').length;
  const prayedCount = generalPrayers.filter((p) => (p.status || '').toLowerCase() === 'prayed').length;

  return (
    <div className="admin-prayers">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-primary-subtle text-primary fs-6 px-3 py-1 rounded-pill">
              <i className="fas fa-praying-hands me-1"></i> 24/7 Intercession
            </span>
          </div>
          <h3 className="fw-bold mb-1">Prayer Request Pipeline</h3>
          <p className="text-muted small mb-0">
            Track and manage online intercessory prayer requests received from website visitors
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
            <span className="text-muted small fw-semibold text-uppercase">Total Prayer Requests</span>
            <h3 className="fw-bold text-primary mb-0 mt-2">{totalCount}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <span className="text-muted small fw-semibold text-uppercase">New / Pending</span>
            <h3 className="fw-bold text-warning mb-0 mt-2">{pendingCount}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <span className="text-muted small fw-semibold text-uppercase">In Prayer</span>
            <h3 className="fw-bold text-info mb-0 mt-2">{inPrayerCount}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <span className="text-muted small fw-semibold text-uppercase">Prayed / Answered</span>
            <h3 className="fw-bold text-success mb-0 mt-2">{prayedCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <div className="row g-2 align-items-center">
          <div className="col-md-6">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search prayer requests by name, email, text..."
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
          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">NEW</option>
              <option value="assigned">ASSIGNED</option>
              <option value="in_prayer">IN PRAYER</option>
              <option value="prayed">PRAYED</option>
              <option value="closed">CLOSED</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="health">Health & Healing</option>
              <option value="family">Family & Marriage</option>
              <option value="financial">Financial & Job</option>
              <option value="spiritual">Spiritual Growth</option>
              <option value="career">Career / Visa</option>
              <option value="relationships">Relationships</option>
              <option value="other">General / Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
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
                  <th className="ps-3 ps-md-4" style={{ minWidth: '120px' }}>Category</th>
                  <th style={{ minWidth: '160px' }}>Submitted By</th>
                  <th style={{ minWidth: '200px' }}>Request Text</th>
                  <th style={{ minWidth: '95px' }}>Date</th>
                  <th style={{ minWidth: '120px' }}>Status</th>
                  <th className="text-end pe-3 pe-md-4" style={{ minWidth: '110px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrayers.length > 0 ? (
                  filteredPrayers.map((p) => (
                    <tr key={p.id}>
                      <td className="ps-3 ps-md-4">
                        <span className="badge bg-primary-subtle text-primary text-uppercase px-2 py-1 rounded-pill">
                          {p.category || 'General'}
                        </span>
                      </td>
                      <td>
                        {p.is_anonymous ? (
                          <span className="text-muted fst-italic">
                            <i className="fas fa-user-secret me-1"></i> Anonymous
                          </span>
                        ) : (
                          <div>
                            <div className="fw-semibold text-dark">{p.name || 'Visitor'}</div>
                            {p.email && (
                              <small className="text-muted d-block text-truncate" style={{ maxWidth: '160px' }}>
                                <a href={`mailto:${p.email}`} className="text-decoration-none text-muted">
                                  {p.email}
                                </a>
                              </small>
                            )}
                            {p.phone && (
                              <small className="text-muted d-block">
                                <a href={`tel:${p.phone}`} className="text-decoration-none text-muted">
                                  {p.phone}
                                </a>
                              </small>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <div
                          className="small text-dark text-truncate"
                          style={{ maxWidth: '260px', cursor: 'pointer' }}
                          onClick={() => openDetailsModal(p)}
                          title={p.request_text}
                        >
                          {p.request_text}
                        </div>
                      </td>
                      <td className="small text-muted text-nowrap">
                        {p.created_at ? new Date(p.created_at).toLocaleDateString() : 'Recent'}
                      </td>
                      <td>
                        <select
                          className={`form-select form-select-sm fw-semibold ${
                            (p.status || '').toUpperCase() === 'CLOSED'
                              ? 'text-secondary border-secondary-subtle'
                              : (p.status || '').toUpperCase() === 'PRAYED'
                              ? 'text-success border-success-subtle bg-success-subtle'
                              : (p.status || '').toUpperCase() === 'IN_PRAYER'
                              ? 'text-info border-info-subtle bg-info-subtle'
                              : 'text-warning border-warning-subtle bg-warning-subtle'
                          }`}
                          style={{ minWidth: '105px' }}
                          value={(p.status || 'new').toLowerCase()}
                          onChange={(e) => handleStatusChange(p.id, e.target.value)}
                        >
                          <option value="new">NEW</option>
                          <option value="assigned">ASSIGNED</option>
                          <option value="in_prayer">IN PRAYER</option>
                          <option value="prayed">PRAYED</option>
                          <option value="closed">CLOSED</option>
                        </select>
                      </td>
                      <td className="text-end pe-3 pe-md-4 text-nowrap">
                        <button
                          className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1 me-1"
                          onClick={() => openDetailsModal(p)}
                          title="View full request & care notes"
                        >
                          <i className="fas fa-eye me-1"></i> View
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1"
                          onClick={() => handleDelete(p.id)}
                          title="Delete prayer request"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-5">
                      <div className="py-4">
                        <i className="fas fa-praying-hands fa-3x text-muted mb-3 d-block opacity-50"></i>
                        <h5>No prayer requests found</h5>
                        <p className="small text-muted mb-0">
                          {search || statusFilter !== 'all' || categoryFilter !== 'all'
                            ? 'Try resetting your search or category filter.'
                            : 'New prayer requests submitted from the website will show up here.'}
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
                  <i className="fas fa-praying-hands fs-5"></i>
                  <h5 className="modal-title fw-bold mb-0">Prayer Request Details</h5>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedPrayer(null)}
                ></button>
              </div>

              <div className="modal-body p-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                <div className="card bg-light border-0 rounded-3 p-3 mb-3">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="small text-muted">Submitted By</div>
                      <div className="fw-bold fs-6">
                        {selectedPrayer.is_anonymous ? (
                          <span className="fst-italic text-muted">Anonymous User</span>
                        ) : (
                          selectedPrayer.name || 'Visitor'
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="small text-muted">Category</div>
                      <span className="badge bg-primary-subtle text-primary text-uppercase px-2 py-1 mt-1">
                        {selectedPrayer.category || 'General'}
                      </span>
                    </div>
                    <div className="col-md-6">
                      <div className="small text-muted">Contact Phone</div>
                      <div className="fw-semibold">
                        {selectedPrayer.phone ? (
                          <a href={`tel:${selectedPrayer.phone}`} className="text-decoration-none">
                            <i className="fas fa-phone-alt text-primary me-1"></i> {selectedPrayer.phone}
                          </a>
                        ) : (
                          <span className="text-muted">Not provided</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="small text-muted">Email</div>
                      <div className="fw-semibold">
                        {selectedPrayer.email ? (
                          <a href={`mailto:${selectedPrayer.email}`} className="text-decoration-none">
                            <i className="fas fa-envelope text-primary me-1"></i> {selectedPrayer.email}
                          </a>
                        ) : (
                          <span className="text-muted">Not provided</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="small text-muted">Submitted Date</div>
                      <div className="fw-semibold mt-1">
                        {selectedPrayer.created_at
                          ? new Date(selectedPrayer.created_at).toLocaleString()
                          : 'Recent'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-dark">Prayer Request Message</label>
                  <div
                    className="p-3 bg-white border rounded-3 text-secondary"
                    style={{ whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: '1.6' }}
                  >
                    {selectedPrayer.request_text}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-4">
                  <span className="fw-bold text-dark small">Current Workflow Status:</span>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={(selectedPrayer.status || 'new').toLowerCase()}
                    onChange={(e) => handleStatusChange(selectedPrayer.id, e.target.value)}
                  >
                    <option value="new">NEW</option>
                    <option value="assigned">ASSIGNED</option>
                    <option value="in_prayer">IN PRAYER</option>
                    <option value="prayed">PRAYED</option>
                    <option value="closed">CLOSED</option>
                  </select>
                </div>

                {/* Ministry & Care Notes Thread */}
                <div className="border-top pt-3">
                  <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="fas fa-sticky-note text-warning"></i> Intercessory Care Notes
                  </h6>

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
                    <p className="text-muted small mb-3">No care notes recorded yet.</p>
                  )}

                  <form onSubmit={handleAddNote}>
                    <div className="input-group">
                      <textarea
                        className="form-control form-control-sm"
                        placeholder="Add internal intercessor note..."
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

export default AdminPrayersPage;
