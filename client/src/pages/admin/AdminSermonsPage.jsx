import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminSermonsPage = () => {
  const { addToast } = useToast();
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', speaker: '', youtube_url: '', description: '', status: 'published' });

  const fetchSermons = () => {
    setLoading(true);
    api.admin
      .getSermons()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setSermons(list);
      })
      .catch((err) => {
        console.error('Failed to fetch sermons:', err);
        addToast(err?.message || 'Failed to load sermons', 'error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.admin.createSermon(formData);
      if (res.success) {
        addToast('Sermon added to archives', 'success');
        setShowModal(false);
        setFormData({ title: '', speaker: '', youtube_url: '', description: '', status: 'published' });
        fetchSermons();
      }
    } catch (err) {
      addToast(err.message || 'Failed to add sermon', 'error');
    }
  };

  const handleToggleStatus = async (sermon) => {
    const newStatus = sermon.status === 'published' ? 'draft' : 'published';
    try {
      await api.admin.updateSermon(sermon.id, { ...sermon, status: newStatus });
      addToast(`Sermon status changed to ${newStatus}`, 'success');
      fetchSermons();
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete sermon archive?')) return;
    try {
      await api.admin.deleteSermon(id);
      addToast('Sermon deleted', 'info');
      fetchSermons();
    } catch (err) {
      addToast(err.message || 'Failed to delete sermon', 'error');
    }
  };

  return (
    <div className="admin-sermons">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Sermons Manager</h3>
          <p className="text-muted small mb-0">Publish sermon videos and audio recordings</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add New Sermon
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
                <th>Speaker</th>
                <th>Status</th>
                <th>YouTube Link</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sermons.length > 0 ? (
                sermons.map((s) => (
                  <tr key={s.id}>
                    <td className="ps-4 fw-semibold">{s.title}</td>
                    <td>{s.speaker || 'Pastor'}</td>
                    <td>
                      <span
                        className={`badge ${
                          s.status === 'published'
                            ? 'bg-success-subtle text-success'
                            : 'bg-warning-subtle text-warning'
                        } text-capitalize`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleToggleStatus(s)}
                        title="Click to toggle Published / Draft"
                      >
                        {s.status || 'published'}
                      </span>
                    </td>
                    <td className="small text-truncate" style={{ maxWidth: '200px' }}>{s.youtube_url}</td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleToggleStatus(s)}
                      >
                        {s.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No sermons in library.
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
                <h5 className="modal-title fw-bold">New Sermon Archive</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Sermon Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Speaker</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.speaker}
                        onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="published">Published (Visible on site)</option>
                        <option value="draft">Draft (Hidden)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">YouTube URL / Video ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={formData.youtube_url}
                      onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Publish Sermon
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
