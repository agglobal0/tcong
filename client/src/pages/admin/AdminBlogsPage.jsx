import React, { useEffect, useState, useRef } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminBlogsPage = () => {
  const { addToast } = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Faith',
    excerpt: '',
    content: '',
    status: 'published',
    is_featured: false,
    featured_image_url: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  const fetchBlogs = () => {
    setLoading(true);
    api.admin
      .getBlogs()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setBlogs(list);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs:', err);
        addToast(err?.message || 'Failed to load blogs', 'error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      category: 'Faith',
      excerpt: '',
      content: '',
      status: 'published',
      is_featured: false,
      featured_image_url: '',
    });
    setSelectedFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      category: blog.category_name || blog.category || 'Faith',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      status: blog.status || 'published',
      is_featured: Boolean(blog.is_featured),
      featured_image_url: blog.featured_image || '',
    });
    setSelectedFile(null);
    setImagePreview(blog.featured_image || '');
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setImagePreview('');
    setFormData((prev) => ({ ...prev, featured_image_url: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      addToast('Please fill in both title and content', 'error');
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      data.append('title', formData.title.trim());
      data.append('category', formData.category.trim());
      data.append('excerpt', formData.excerpt.trim());
      data.append('content', formData.content.trim());
      data.append('status', formData.status);
      data.append('is_featured', formData.is_featured ? '1' : '0');

      if (selectedFile) {
        data.append('featured_image', selectedFile);
      } else if (formData.featured_image_url) {
        data.append('featured_image', formData.featured_image_url);
      }

      if (editingBlog) {
        const res = await api.admin.updateBlog(editingBlog.id, data);
        if (res.success || res.status === 'success' || res.id) {
          addToast('Blog post updated successfully!', 'success');
        } else {
          addToast('Blog post updated!', 'success');
        }
      } else {
        const res = await api.admin.createBlog(data);
        if (res.success || res.status === 'success' || res.id) {
          addToast('Blog post created successfully!', 'success');
        } else {
          addToast('Blog post created!', 'success');
        }
      }

      setShowModal(false);
      fetchBlogs();
    } catch (err) {
      console.error('Failed to save blog:', err);
      addToast(err?.message || 'Failed to save blog post', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      await api.admin.updateBlog(blog.id, { ...blog, status: newStatus });
      addToast(`Blog status changed to ${newStatus}`, 'success');
      fetchBlogs();
    } catch (err) {
      addToast(err?.message || 'Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.admin.deleteBlog(id);
      addToast('Blog post deleted', 'info');
      fetchBlogs();
    } catch (err) {
      addToast(err?.message || 'Failed to delete post', 'error');
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      !searchQuery ||
      b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ||
      b.category_name?.toLowerCase() === categoryFilter.toLowerCase() ||
      b.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['Faith', 'Prayer', 'Healing', 'Worship', 'Devotional', 'Family', 'Youth', 'General'];

  return (
    <div className="admin-blogs">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: '#1E1B4B' }}>Blogs & Devotionals Manager</h3>
          <p className="text-muted small mb-0">Create, upload cover images, and publish inspiring faith articles</p>
        </div>
        <button
          className="btn btn-primary d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-semibold shadow-sm"
          style={{ backgroundColor: '#4338CA', borderColor: '#4338CA' }}
          onClick={openCreateModal}
        >
          <i className="fas fa-plus"></i>
          <span>Create New Blog</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-0 text-muted">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search articles by title, content, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="btn btn-light border-0 text-muted" onClick={() => setSearchQuery('')}>
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex flex-wrap gap-2 justify-content-md-end">
            <button
              className={`btn btn-sm rounded-pill px-3 fw-semibold ${categoryFilter === 'all' ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setCategoryFilter('all')}
            >
              All Topics ({blogs.length})
            </button>
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm rounded-pill px-3 fw-semibold ${categoryFilter.toLowerCase() === cat.toLowerCase() ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={categoryFilter.toLowerCase() === cat.toLowerCase() ? { backgroundColor: '#4338CA', borderColor: '#4338CA' } : {}}
                onClick={() => setCategoryFilter(categoryFilter.toLowerCase() === cat.toLowerCase() ? 'all' : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted small mt-2">Loading articles...</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4" style={{ width: '80px' }}>Cover</th>
                  <th>Title & Excerpt</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((b) => (
                    <tr key={b.id}>
                      <td className="ps-4">
                        {b.featured_image ? (
                          <img
                            src={b.featured_image}
                            alt={b.title}
                            className="rounded-3 shadow-sm object-fit-cover"
                            style={{ width: '60px', height: '45px' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div
                            className="rounded-3 d-flex align-items-center justify-content-center text-muted bg-light"
                            style={{ width: '60px', height: '45px', border: '1px dashed #cbd5e1' }}
                            title="No image uploaded"
                          >
                            <i className="fas fa-image text-secondary"></i>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold text-dark">{b.title}</span>
                            {Boolean(b.is_featured) && (
                              <span className="badge bg-warning text-dark px-2 py-0 rounded-pill small">
                                <i className="fas fa-star me-1"></i>Featured
                              </span>
                            )}
                          </div>
                          {b.excerpt && (
                            <small className="text-muted text-truncate" style={{ maxWidth: '380px' }}>
                              {b.excerpt}
                            </small>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge px-3 py-1 rounded-pill fw-semibold" style={{ backgroundColor: '#EEF2FF', color: '#4338CA' }}>
                          {b.category_name || b.category || 'Faith'}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            b.status === 'published'
                              ? 'bg-success-subtle text-success'
                              : 'bg-warning-subtle text-warning'
                          } text-capitalize px-3 py-1 rounded-pill`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleToggleStatus(b)}
                          title="Click to toggle Published / Draft"
                        >
                          <i className={`fas fa-circle me-1 small ${b.status === 'published' ? 'text-success' : 'text-warning'}`} style={{ fontSize: '8px' }}></i>
                          {b.status || 'published'}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">{new Date(b.created_at || Date.now()).toLocaleDateString()}</small>
                      </td>
                      <td className="text-end pe-4">
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-primary rounded-pill px-3 me-2"
                            onClick={() => openEditModal(b)}
                            title="Edit Blog"
                          >
                            <i className="fas fa-edit me-1"></i> Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                            onClick={() => handleDelete(b.id)}
                            title="Delete Blog"
                          >
                            <i className="fas fa-trash-alt me-1"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-5">
                      <i className="fas fa-newspaper fa-3x text-muted opacity-50 mb-3 d-block"></i>
                      <p className="mb-0 fw-semibold">No blog posts found matching your filter.</p>
                      <button className="btn btn-sm btn-outline-primary mt-3 rounded-pill" onClick={openCreateModal}>
                        + Create First Article
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════ CREATE / EDIT MODAL ═══════ */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div className="modal-header border-0 pb-0 pt-4 px-4">
                <div>
                  <h4 className="modal-title fw-bold" style={{ color: '#1E1B4B' }}>
                    {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </h4>
                  <p className="text-muted small mb-0">Provide article details and upload a featured cover image</p>
                </div>
                <button type="button" className="btn-close" onClick={() => !saving && setShowModal(false)}></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body px-4 py-3">
                  {/* Title */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase text-secondary">
                      Article Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="e.g. Walking in Divine Favor and Faith"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  {/* Category & Status */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-uppercase text-secondary">
                        Category / Topic
                      </label>
                      <select
                        className="form-select rounded-3"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-uppercase text-secondary">
                        Publish Status
                      </label>
                      <select
                        className="form-select rounded-3"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="published">Published (Visible to all website visitors)</option>
                        <option value="draft">Draft (Saved privately)</option>
                      </select>
                    </div>
                  </div>

                  {/* ═══════ FEATURED IMAGE UPLOAD ═══════ */}
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase text-secondary d-flex justify-content-between">
                      <span>Cover / Featured Image</span>
                      <span className="text-muted font-monospace small">Supports JPG, PNG, WEBP, AVIF</span>
                    </label>

                    {imagePreview ? (
                      <div className="position-relative rounded-4 overflow-hidden border border-2 shadow-sm mb-2" style={{ maxHeight: '240px' }}>
                        <img
                          src={imagePreview}
                          alt="Cover Preview"
                          className="w-100 object-fit-cover"
                          style={{ maxHeight: '240px' }}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle shadow"
                          style={{ width: '36px', height: '36px' }}
                          onClick={removeSelectedImage}
                          title="Remove cover image"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ) : (
                      <div
                        className="rounded-4 p-4 text-center border-2 border-dashed d-flex flex-column align-items-center justify-content-center"
                        style={{
                          backgroundColor: '#F8FAFC',
                          borderColor: '#CBD5E1',
                          borderStyle: 'dashed',
                          cursor: 'pointer',
                        }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                          style={{ width: '54px', height: '54px', backgroundColor: '#EEF2FF', color: '#4338CA' }}
                        >
                          <i className="fas fa-cloud-arrow-up fs-4"></i>
                        </div>
                        <h6 className="fw-bold mb-1 text-dark">Click to upload cover image</h6>
                        <p className="text-muted small mb-0">Recommended size: 1200 × 630 px</p>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="d-none"
                      onChange={handleFileChange}
                    />

                    {/* Or paste image URL */}
                    <div className="mt-2">
                      <small className="text-muted d-block mb-1">Or enter external image URL directly:</small>
                      <input
                        type="url"
                        className="form-control form-control-sm rounded-3"
                        placeholder="https://example.com/image.jpg"
                        value={formData.featured_image_url}
                        onChange={(e) => {
                          setFormData({ ...formData, featured_image_url: e.target.value });
                          if (!selectedFile) setImagePreview(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase text-secondary">
                      Short Summary / Excerpt (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="Brief overview shown on cards and Google search previews..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      maxLength={200}
                    />
                  </div>

                  {/* Content */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase text-secondary">
                      Article Content <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control rounded-3"
                      rows="8"
                      placeholder="Write your inspiring article or devotional content here..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  {/* Featured Checkbox */}
                  <div className="form-check form-switch mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isFeaturedSwitch"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold text-dark" htmlFor="isFeaturedSwitch">
                      Highlight as Featured Article on Blog Homepage
                    </label>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0 pb-4 px-4">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill px-4 fw-semibold"
                    onClick={() => setShowModal(false)}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-5 fw-bold d-inline-flex align-items-center gap-2"
                    style={{ backgroundColor: '#4338CA', borderColor: '#4338CA' }}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Saving Article...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check"></i>
                        <span>{editingBlog ? 'Update Article' : 'Publish Article'}</span>
                      </>
                    )}
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
