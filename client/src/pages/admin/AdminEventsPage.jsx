import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminEventsPage = () => {
  const { addToast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', event_date: '', location: '', description: '', status: 'published' });

  const fetchEvents = () => {
    setLoading(true);
    api.admin
      .getEvents()
      .then((res) => setEvents(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.admin.createEvent(formData);
      if (res.success) {
        addToast('Event created successfully', 'success');
        setShowModal(false);
        setFormData({ title: '', event_date: '', location: '', description: '', status: 'published' });
        fetchEvents();
      }
    } catch (err) {
      addToast(err.message || 'Failed to create event', 'error');
    }
  };

  const handleToggleStatus = async (eventItem) => {
    const newStatus = eventItem.status === 'published' ? 'draft' : 'published';
    try {
      await api.admin.updateEvent(eventItem.id, { ...eventItem, status: newStatus });
      addToast(`Event status changed to ${newStatus}`, 'success');
      fetchEvents();
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete event?')) return;
    try {
      await api.admin.deleteEvent(id);
      addToast('Event deleted', 'info');
      fetchEvents();
    } catch (err) {
      addToast(err.message || 'Failed to delete event', 'error');
    }
  };

  return (
    <div className="admin-events">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Events Manager</h3>
          <p className="text-muted small mb-0">Organize and schedule upcoming church events</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add New Event
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Location</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((e) => (
                  <tr key={e.id}>
                    <td className="ps-4 fw-semibold">{e.title}</td>
                    <td>{e.event_date ? new Date(e.event_date).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <span
                        className={`badge ${
                          e.status === 'published'
                            ? 'bg-success-subtle text-success'
                            : 'bg-warning-subtle text-warning'
                        } text-capitalize`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleToggleStatus(e)}
                        title="Click to toggle Published / Draft"
                      >
                        {e.status || 'published'}
                      </span>
                    </td>
                    <td>{e.location || 'Sanctuary'}</td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleToggleStatus(e)}
                      >
                        {e.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(e.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No events scheduled.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-3">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">New Event</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Event Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(evt) => setFormData({ ...formData, title: evt.target.value })}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Date</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={formData.event_date}
                        onChange={(evt) => setFormData({ ...formData, event_date: evt.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(evt) => setFormData({ ...formData, status: evt.target.value })}
                      >
                        <option value="published">Published (Visible on site)</option>
                        <option value="draft">Draft (Hidden)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.location}
                      onChange={(evt) => setFormData({ ...formData, location: evt.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(evt) => setFormData({ ...formData, description: evt.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
