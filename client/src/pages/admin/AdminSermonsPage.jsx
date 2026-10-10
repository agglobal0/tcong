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
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1">Sermons Manager</h3>
          <p className="text-muted small mb-0">Publish sermon videos and audio recordings</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-1"></i> Add New Sermon
        </button>
      </div>

      {/* Content: Mobile Cards + Desktop Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <>
          {/* Mobile Card View (visible on < 768px screens) */}
          <div className="d-md-none">
            {sermons.length > 0 ? (
              sermons.map((s) => {
                let cleanUrl = (s.youtube_url || '').trim();
                if (cleanUrl.includes('<iframe') && cleanUrl.includes('src="')) {
                  const srcMatch = cleanUrl.match(/src=["']([^"']+)["']/i);
                  if (srcMatch) cleanUrl = srcMatch[1];
                }
                const isDirectLink = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://');

                return (
                  <div key={s.id} className="admin-mobile-card">
                    <div className="admin-mobile-card-header">
                      <div>
                        <div className="fw-bold text-dark fs-6">{s.title}</div>
                        <small className="text-muted">
                          <i className="fas fa-user-tie me-1"></i>
                          {s.speaker || 'Pastor'}
                        </small>
                      </div>
                      <span
                        className={`badge ${
                          s.status === 'published'
                            ? 'bg-success-subtle text-success'
                            : 'bg-warning-subtle text-warning'
                        } text-capitalize px-2.5 py-1 rounded-pill text-nowrap`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleToggleStatus(s)}
                        title="Click to toggle Published / Draft"
                      >
                        <i className={`fas fa-circle me-1 small ${s.status === 'published' ? 'text-success' : 'text-warning'}`} style={{ fontSize: '8px' }}></i>
                        {s.status || 'published'}
                      </span>
                    </div>

                    <div className="mb-2">
                      {cleanUrl && (
                        <div className="mb-2">
                          <a
                            href={isDirectLink ? cleanUrl : `https://www.youtube.com/watch?v=${cleanUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 small"
                          >
                            <i className="fab fa-youtube me-1"></i> Watch Sermon Video
                          </a>
                        </div>
                      )}
                      {s.description && (
                        <p className="small text-muted mb-0" style={{ lineHeight: '1.4' }}>
                          {s.description}
                        </p>
                      )}
                    </div>

                    <div className="admin-mobile-card-footer justify-content-end gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1"
                        onClick={() => handleToggleStatus(s)}
                      >
                        {s.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1"
                        onClick={() => handleDelete(s.id)}
                      >
                        <i className="fas fa-trash-alt me-1"></i> Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white text-muted">
                <i className="fas fa-video-slash fa-2x mb-2 opacity-50"></i>
                <p className="mb-2 small">No sermons in library.</p>
                <button className="btn btn-sm btn-outline-primary rounded-pill mx-auto" onClick={() => setShowModal(true)}>
                  + Add First Sermon
                </button>
              </div>
            )}
          </div>

          {/* Desktop Table View (visible on >= 768px screens) */}
          <div className="card border-0 shadow-sm rounded-4 bg-white d-none d-md-block">
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
              <table className="table table-hover align-middle mb-0 w-100">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-3 ps-md-4" style={{ minWidth: '160px' }}>Title</th>
                    <th style={{ minWidth: '130px' }}>Speaker</th>
                    <th style={{ minWidth: '110px' }}>Status</th>
                    <th style={{ minWidth: '140px' }}>Video Link</th>
                    <th className="text-end pe-3 pe-md-4" style={{ minWidth: '160px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sermons.length > 0 ? (
                    sermons.map((s) => {
                      let cleanUrl = (s.youtube_url || '').trim();
                      if (cleanUrl.includes('<iframe') && cleanUrl.includes('src="')) {
                        const srcMatch = cleanUrl.match(/src=["']([^"']+)["']/i);
                        if (srcMatch) cleanUrl = srcMatch[1];
                      }
                      const isDirectLink = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://');

                      return (
                        <tr key={s.id}>
                          <td className="ps-3 ps-md-4 fw-semibold text-dark">{s.title}</td>
                          <td className="text-muted">{s.speaker || 'Pastor'}</td>
                          <td>
                            <span
                              className={`badge ${
                                s.status === 'published'
                                  ? 'bg-success-subtle text-success'
                                  : 'bg-warning-subtle text-warning'
                              } text-capitalize px-3 py-1 rounded-pill text-nowrap`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleToggleStatus(s)}
                              title="Click to toggle Published / Draft"
                            >
                              <i className={`fas fa-circle me-1 small ${s.status === 'published' ? 'text-success' : 'text-warning'}`} style={{ fontSize: '8px' }}></i>
                              {s.status || 'published'}
                            </span>
                          </td>
                          <td>
                            {cleanUrl ? (
                              <a
                                href={isDirectLink ? cleanUrl : `https://www.youtube.com/watch?v=${cleanUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="badge bg-danger-subtle text-danger text-decoration-none px-2 py-1 rounded-pill text-nowrap"
                                title="Open Video Link"
                              >
                                <i className="fab fa-youtube me-1"></i> Watch Video
                              </a>
                            ) : (
                              <span className="text-muted small">No Link</span>
                            )}
                          </td>
                          <td className="text-end pe-3 pe-md-4 text-nowrap">
                            <button
                              className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1 me-1"
                              onClick={() => handleToggleStatus(s)}
                            >
                              {s.status === 'published' ? 'Unpublish' : 'Publish'}
                            </button>
                            <button className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1" onClick={() => handleDelete(s.id)}>
                              <i className="fas fa-trash-alt me-1"></i> Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
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
          </div>
        </>
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
