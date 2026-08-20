import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.public
      .getBlog(slug)
      .then((res) => setBlog(res.data))
      .catch((err) => setError(err.message || 'Failed to load article'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger mb-3">Article Not Found</h3>
        <Link to="/blog" className="btn btn-primary">&larr; Back to Articles</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-page py-5">
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/blog" className="btn btn-sm btn-outline-secondary mb-4">&larr; Back to Articles</Link>
        <span className="badge bg-primary-subtle text-primary mb-2 d-inline-block">{blog.category || 'Article'}</span>
        <h1 className="display-5 fw-bold mb-3">{blog.title}</h1>
        <div className="d-flex align-items-center gap-3 text-muted mb-4 pb-3 border-bottom">
          <span><i className="fas fa-user me-1"></i> {blog.author_name || 'Church Editorial Team'}</span>
          <span><i className="fas fa-calendar me-1"></i> {new Date(blog.created_at || Date.now()).toLocaleDateString()}</span>
        </div>

        {blog.featured_image && (
          <img src={blog.featured_image} alt={blog.title} className="img-fluid rounded-4 mb-4 w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        )}

        <div className="blog-content lead text-secondary" style={{ lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      </div>
    </div>
  );
};
