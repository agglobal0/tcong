import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminGalleryPage = () => {
  const { addToast } = useToast();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', image_url: '' });

  const fetchAlbums = () => {
    setLoading(true);
    api.admin
      .getAlbums()
      .then((res) => setAlbums(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.admin.createAlbum(formData);
      if (res.success) {
        addToast('Photo added to gallery', 'success');
        setShowModal(false);
        setFormData({ title: '', image_url: '' });
        fetchAlbums();
      }
    } catch (err) {
      addToast(err.message || 'Failed to add photo', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete photo from gallery?')) return;
    try {
      await api.admin.deleteAlbum(id);
      addToast('Photo deleted', 'info');
      fetchAlbums();
    } catch (err) {
      addToast(err.message || 'Failed to delete item', 'error');
    }
  };

  return (
    <div className="admin-gallery">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Gallery & Media Albums</h3>
          <p className="text-muted small mb-0">Manage photo albums and community highlights</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add New Photo
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div className="row g-4">
          {albums.length > 0 ? (
            albums.map((img) => (
              <div className="col-md-3" key={img.id}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                  <img
                    src={img.image_url || img.url}
                    alt={img.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-3 d-flex justify-content-between align-items-center">
                    <span className="fw-semibold small text-truncate">{img.title || 'Church Media'}</span>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(img.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted py-5">
              No photo albums created yet.
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-3">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Add Photo to Gallery</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Photo Title / Caption</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Upload Photo
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
