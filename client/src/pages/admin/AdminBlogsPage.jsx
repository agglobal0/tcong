import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminBlogsPage = () => {
  const { addToast } = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', content: '', status: 'published' });

  const fetchBlogs = () => {
    setLoading(true);
    api.admin
      .getBlogs()
      .then((res) => setBlogs(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.admin.createBlog(formData);
      if (res.success) {
        addToast('Blog post created successfully', 'success');
        setShowModal(false);
        setFormData({ title: '', category: '', content: '', status: 'published' });
        fetchBlogs();
      }
    } catch (err) {
      addToast(err.message || 'Failed to create blog post', 'error');
    }
  };

  const handleToggleStatus = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      await api.admin.updateBlog(blog.id, { ...blog, status: newStatus });
      addToast(`Blog status changed to ${newStatus}`, 'success');
      fetchBlogs();
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.admin.deleteBlog(id);
      addToast('Blog post deleted', 'info');
      fetchBlogs();
    } catch (err) {
      addToast(err.message || 'Failed to delete post', 'error');
    }
  };

  return (
    <div className="admin-blogs">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Blogs & Articles Manager</h3>
          <p className="text-muted small mb-0">Create and publish devotional content</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Create New Blog
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
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((b) => (
                  <tr key={b.id}>
                    <td className="ps-4 fw-semibold">{b.title}</td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary">
                        {b.category_name || b.category || 'General'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === 'published'
                            ? 'bg-success-subtle text-success'
                            : 'bg-warning-subtle text-warning'
                        } text-capitalize style-pointer`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleToggleStatus(b)}
                        title="Click to toggle Published / Draft"
                      >
                        {b.status || 'published'}
                      </span>
                    </td>
                    <td>{new Date(b.created_at || Date.now()).toLocaleDateString()}</td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleToggleStatus(b)}
                      >
                        {b.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(b.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No blogs created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 p-3">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">New Blog Post</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Title</label>
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
                      <label className="form-label fw-semibold">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Faith, Worship, Prayer"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    <label className="form-label fw-semibold">Content</label>
                    <textarea
                      className="form-control"
                      rows="6"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Publish Blog
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
