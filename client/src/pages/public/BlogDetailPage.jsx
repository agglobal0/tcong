import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api, getBlogImage, getMediaUrl } from '../../services/api';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.public
      .getBlog(slug)
      .then((res) => {
        setBlog(res.data || res);
      })
      .catch((err) => setError(err.message || 'Failed to load article'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const calculateReadTime = (content = '') => {
    const wordCount = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes || 3} min read`;
  };

  if (loading) {
    return (
      <div className="text-center py-5 my-5" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status" style={{ color: '#4338CA' }}></div>
        <p className="text-muted small mt-2">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container py-5 my-5 text-center" style={{ minHeight: '50vh' }}>
        <div className="p-5 bg-white rounded-4 shadow-sm max-w-lg mx-auto" style={{ maxWidth: '600px' }}>
          <i className="fas fa-file-circle-xmark fa-3x text-danger mb-3"></i>
          <h3 className="fw-bold mb-2">Article Not Found</h3>
          <p className="text-muted mb-4">The article you are looking for might have been moved or unpublished.</p>
          <Link to="/blog" className="btn btn-primary rounded-pill px-4" style={{ backgroundColor: '#4338CA' }}>
            &larr; Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blog.title;

  return (
    <div className="blog-detail-page" style={{ backgroundColor: '#F8FAFC' }}>
      <Helmet>
        <title>{blog.meta_title || `${blog.title} | TCONG Melbourne Devotionals`}</title>
        <meta
          name="description"
          content={blog.meta_description || blog.excerpt || blog.title}
        />
        <link rel="canonical" href={`https://www.churchofnewgeneration.com/blog/${blog.slug || blog.id}`} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        <meta property="og:url" content={`https://www.churchofnewgeneration.com/blog/${blog.slug || blog.id}`} />
        <meta property="og:image" content={getBlogImage(blog, 0)} />
      </Helmet>

      {/* ═══════ ARTICLE HEADER BANNER ═══════ */}
      <section
        className="py-5 text-white position-relative"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-3" style={{ maxWidth: '880px' }}>
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <Link to="/blog" className="text-white-50 text-decoration-none small hover-white d-inline-flex align-items-center gap-1">
              <i className="fas fa-arrow-left me-1"></i> Back to All Articles
            </Link>
          </div>

          {/* Article Title */}
          <h1 className="display-5 fw-bold mb-4 text-white" style={{ lineHeight: '1.25' }}>
            {blog.title}
          </h1>

          {/* Metadata Row */}
          <div className="d-flex flex-wrap align-items-center gap-3 text-white-50 small">
            <span>
              <i className="fas fa-calendar-alt me-1 text-warning"></i>
              {new Date(blog.published_at || blog.created_at || Date.now()).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT SECTION ═══════ */}
      <section className="py-5">
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
            {/* Featured Image */}
            <div className="mb-5 rounded-4 overflow-hidden shadow-sm">
              <img
                src={getBlogImage(blog, 0)}
                alt={blog.title}
                className="w-100 object-fit-cover"
                style={{ maxHeight: '480px' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/about-us.jpg';
                }}
              />
            </div>

            {/* Excerpt Callout */}
            {blog.excerpt && (
              <div
                className="p-4 rounded-3 mb-4"
                style={{
                  backgroundColor: '#EEF2FF',
                  borderLeft: '4px solid #4338CA',
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: '#1E1B4B',
                  lineHeight: '1.7',
                }}
              >
                "{blog.excerpt}"
              </div>
            )}

            {/* Main Article Body */}
            <div
              className="blog-content text-dark mb-5"
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.85',
                whiteSpace: 'pre-line',
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

            {/* Social Share Bar */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-4 border-top">
              <span className="fw-bold text-dark small text-uppercase">
                <i className="fas fa-share-nodes me-2 text-primary"></i> Share this Article:
              </span>
              <div className="d-flex flex-wrap align-items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 text-nowrap"
                  title="Copy Link to Clipboard"
                >
                  <i className={`fas ${copied ? 'fa-check text-success' : 'fa-link'} me-1`}></i>
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-success rounded-pill px-3 text-white text-nowrap"
                  title="Share on WhatsApp"
                >
                  <i className="fab fa-whatsapp me-1"></i> WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary rounded-pill px-3 text-white text-nowrap"
                  title="Share on Facebook"
                >
                  <i className="fab fa-facebook-f me-1"></i> Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Navigation & Prayer CTA */}
          <div className="mt-5 mb-5 pb-4 text-center">
            <div
              className="p-4 p-md-5 rounded-4 shadow-sm text-white"
              style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)' }}
            >
              <h3 className="fw-bold mb-2">Need Prayer or Guidance?</h3>
              <p className="text-white-50 max-w-xl mx-auto mb-4" style={{ maxWidth: '600px' }}>
                Our 24/7 Telephone Prayer Tower and pastoral team are standing by to pray with you for breakthrough and healing.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <Link
                  to="/prayer-request"
                  className="btn btn-warning fw-bold rounded-pill px-4 py-2 text-nowrap shadow-sm"
                >
                  <i className="fas fa-hands-praying me-2"></i> Submit Prayer Request
                </Link>
                <Link
                  to="/blog"
                  className="btn btn-outline-light rounded-pill px-4 py-2 text-nowrap"
                >
                  &larr; More Devotionals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
