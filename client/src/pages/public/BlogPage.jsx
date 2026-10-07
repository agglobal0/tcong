import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { StaggerSequence } from '../../components/common/StaggerSequence';

export const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadBlogs = (retryCount = 0) => {
    setLoading(true);
    api.public
      .getBlogs()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setBlogs(list);
        if (list.length === 0 && retryCount < 2) {
          setTimeout(() => loadBlogs(retryCount + 1), 2000);
        }
      })
      .catch((err) => {
        console.error(err);
        if (retryCount < 3) {
          setTimeout(() => loadBlogs(retryCount + 1), 2500);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // Compute available categories from blogs or default list
  const categoryList = ['All', 'Faith', 'Prayer', 'Healing', 'Worship', 'Devotional', 'Family'];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (b.category_name || b.category || '').toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find((b) => Boolean(b.is_featured));

  const calculateReadTime = (content = '') => {
    const wordCount = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes || 3} min read`;
  };

  return (
    <div className="blog-page" style={{ backgroundColor: '#F8FAFC' }}>
      <Helmet>
        <title>Christian Devotionals & Faith Articles | TCONG Melbourne Blog</title>
        <meta
          name="description"
          content="Read inspiring Christian devotionals, faith reflections, and biblical teaching articles from The Church of New Generation Melbourne and Pastor Jaskaran Heer's ministry."
        />
        <link rel="canonical" href="https://tcong-murex.vercel.app/blog" />
        <meta property="og:title" content="TCONG Melbourne Blog | Faith Devotionals & Biblical Articles" />
        <meta property="og:url" content="https://tcong-murex.vercel.app/blog" />
      </Helmet>

      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-4">
          <TextSequence
            text="Our Blog - Faith & Devotionals"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-white-50 max-w-xl mx-auto mb-3" style={{ maxWidth: '720px' }}>
              Biblical teaching, daily encouragement, and faith reflections from The Church of New Generation to strengthen your spiritual journey.
            </p>
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <i className="fas fa-book-bible text-warning"></i>
              <span className="fw-semibold text-white small">Biblical Wisdom • Faith Articles • Spiritual Growth</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ FILTER & SEARCH BAR ═══════ */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row g-3 align-items-center justify-content-between">
            {/* Category Pills */}
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-wrap gap-2">
                {categoryList.map((cat) => {
                  const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold transition-all ${
                        isActive
                          ? 'btn-primary text-white shadow-sm'
                          : 'btn-outline-secondary'
                      }`}
                      style={
                        isActive
                          ? { backgroundColor: '#4338CA', borderColor: '#4338CA' }
                          : { borderColor: '#E2E8F0', color: '#475569' }
                      }
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input */}
            <div className="col-12 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-0 text-muted ps-3">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-light border-0 text-muted pe-3"
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BLOGS LISTING ═══════ */}
      <section className="py-5">
        <div className="container py-2">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ color: '#4338CA' }}></div>
              <p className="text-muted small mt-2">Loading inspiring articles...</p>
            </div>
          ) : (
            <div>
              {/* Featured Highlight Card (if exists and no search query) */}
              {featuredBlog && !searchQuery && selectedCategory === 'All' && (
                <div className="mb-5">
                  <ScrollReveal animation="fade-up" delay={100}>
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                      <div className="row g-0">
                        <div className="col-lg-6">
                          {featuredBlog.featured_image ? (
                            <img
                              src={featuredBlog.featured_image}
                              alt={featuredBlog.title}
                              className="w-100 h-100 object-fit-cover"
                              style={{ minHeight: '320px' }}
                            />
                          ) : (
                            <div
                              className="w-100 h-100 d-flex align-items-center justify-content-center text-white"
                              style={{
                                minHeight: '320px',
                                background: 'linear-gradient(135deg, #4338CA 0%, #6366F1 100%)',
                              }}
                            >
                              <i className="fas fa-book-open fa-4x opacity-50"></i>
                            </div>
                          )}
                        </div>
                        <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center">
                          <div className="d-flex align-items-center gap-2 mb-3">
                            <span
                              className="badge px-3 py-1 rounded-pill fw-bold text-uppercase"
                              style={{ backgroundColor: '#EEF2FF', color: '#4338CA' }}
                            >
                              Featured Devotional
                            </span>
                            <span className="text-muted small">
                              <i className="fas fa-clock me-1"></i>
                              {calculateReadTime(featuredBlog.content)}
                            </span>
                          </div>
                          <h2 className="fw-bold mb-3" style={{ color: '#1E1B4B' }}>
                            {featuredBlog.title}
                          </h2>
                          <p className="text-muted mb-4 lead" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                            {featuredBlog.excerpt ||
                              featuredBlog.content?.replace(/<[^>]*>?/gm, '').substring(0, 180)}...
                          </p>
                          <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                            <span className="text-muted small">
                              <i className="fas fa-calendar-alt me-1"></i>
                              {new Date(featuredBlog.published_at || featuredBlog.created_at || Date.now()).toLocaleDateString()}
                            </span>
                            <Link
                              to={`/blog/${featuredBlog.slug || featuredBlog.id}`}
                              className="btn btn-primary rounded-pill px-4 fw-semibold"
                              style={{ backgroundColor: '#4338CA', borderColor: '#4338CA' }}
                            >
                              Read Full Article &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )}

              {/* Grid of Articles */}
              {filteredBlogs.length > 0 ? (
                <StaggerSequence as="div" className="row g-4" initialDelay={100} staggerDelay={100} animation="fade-up">
                  {filteredBlogs.map((b) => (
                    <div className="col-md-6 col-lg-4 d-flex" key={b.id}>
                      <div className="card h-100 w-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column bg-white">
                        {/* Cover Image */}
                        <div className="position-relative overflow-hidden" style={{ height: '220px', backgroundColor: '#EEF2FF' }}>
                          {b.featured_image ? (
                            <img
                              src={b.featured_image}
                              alt={b.title}
                              className="w-100 h-100 object-fit-cover transition-all"
                              onError={(e) => {
                                e.target.parentElement.innerHTML = `
                                  <div class="w-100 h-100 d-flex align-items-center justify-content-center" style="background: linear-gradient(135deg, #4338CA 0%, #6366F1 100%); color: white;">
                                    <i class="fas fa-book-bible fa-3x opacity-50"></i>
                                  </div>
                                `;
                              }}
                            />
                          ) : (
                            <div
                              className="w-100 h-100 d-flex align-items-center justify-content-center text-white"
                              style={{ background: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)' }}
                            >
                              <i className="fas fa-book-bible fa-3x opacity-50"></i>
                            </div>
                          )}
                          <span
                            className="badge position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill fw-bold shadow-sm"
                            style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: '#4338CA' }}
                          >
                            {b.category_name || b.category || 'Devotional'}
                          </span>
                        </div>

                        {/* Card Body */}
                        <div className="card-body p-4 d-flex flex-column flex-grow-1">
                          <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
                            <span>
                              <i className="fas fa-calendar me-1"></i>
                              {new Date(b.published_at || b.created_at || Date.now()).toLocaleDateString()}
                            </span>
                            <span>
                              <i className="fas fa-clock me-1"></i>
                              {calculateReadTime(b.content)}
                            </span>
                          </div>

                          <h4 className="fw-bold mb-2 text-dark" style={{ minHeight: '52px', lineHeight: '1.4' }}>
                            {b.title}
                          </h4>

                          <p className="text-muted small flex-grow-1 mb-4" style={{ lineHeight: '1.6' }}>
                            {b.excerpt || b.content?.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                          </p>

                          <div className="pt-3 border-top mt-auto d-flex align-items-center justify-content-between">
                            <span className="small fw-semibold text-secondary">
                              <i className="fas fa-user-circle me-1 text-primary"></i>
                              {b.author_name || 'Pastor Jaskaran Heer'}
                            </span>
                            <Link
                              to={`/blog/${b.slug || b.id}`}
                              className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold"
                              style={{ borderColor: '#4338CA', color: '#4338CA' }}
                            >
                              Read More &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </StaggerSequence>
              ) : (
                <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5 my-4">
                  <i className="fas fa-book-open fa-3x text-muted opacity-50 mb-3 d-block"></i>
                  <h4 className="fw-bold text-dark">No Articles Found</h4>
                  <p className="text-muted">
                    {searchQuery
                      ? `No blog posts matching "${searchQuery}". Try clearing your search.`
                      : 'No articles currently available in this category. Please check back soon!'}
                  </p>
                  {(searchQuery || selectedCategory !== 'All') && (
                    <button
                      className="btn btn-outline-primary rounded-pill px-4"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
