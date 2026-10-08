import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api, getBlogImage, FALLBACK_BLOG_IMAGES } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { StaggerSequence } from '../../components/common/StaggerSequence';

export const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="blog-page" style={{ backgroundColor: '#F8FAFC' }}>
      <Helmet>
        <title>Christian Devotionals & Faith Articles | TCONG Melbourne Blog</title>
        <meta
          name="description"
          content="Read inspiring Christian devotionals, faith reflections, and biblical teaching articles from The Church of New Generation Melbourne and Pastor Jaskaran Heer's ministry."
        />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/blog" />
        <meta property="og:title" content="TCONG Melbourne Blog | Faith Devotionals & Biblical Articles" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/blog" />
        <meta property="og:image" content="https://www.churchofnewgeneration.com/assets/about-us.jpg" />
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

      {/* ═══════ BLOGS GRID LISTING ═══════ */}
      <section className="py-5">
        <div className="container py-2">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ color: '#4338CA' }}></div>
              <p className="text-muted small mt-2">Loading inspiring articles...</p>
            </div>
          ) : (
            <div>
              {blogs.length > 0 ? (
                <StaggerSequence as="div" className="row g-4" initialDelay={100} staggerDelay={100} animation="fade-up">
                  {blogs.map((b, index) => {
                    const fallbackImg = FALLBACK_BLOG_IMAGES[index % FALLBACK_BLOG_IMAGES.length];
                    const blogImg = getBlogImage(b, index);
                    return (
                      <div className="col-md-6 col-lg-4 d-flex" key={b.id}>
                        <div className="card h-100 w-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column bg-white">
                          {/* Cover Image */}
                          <div className="position-relative overflow-hidden" style={{ height: '220px', backgroundColor: '#EEF2FF' }}>
                            <img
                              src={blogImg}
                              alt={b.title}
                              className="w-100 h-100 object-fit-cover transition-all"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = fallbackImg;
                              }}
                            />
                            {Boolean(b.is_featured) && (
                              <span
                                className="badge position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill fw-bold shadow-sm bg-warning text-dark"
                              >
                                <i className="fas fa-star me-1"></i> Featured
                              </span>
                            )}
                          </div>

                        {/* Card Body */}
                        <div className="card-body p-4 d-flex flex-column flex-grow-1">
                          <div className="text-muted small mb-2 d-flex align-items-center gap-1">
                            <i className="fas fa-calendar-alt text-primary me-1"></i>
                            <span>{new Date(b.published_at || b.created_at || Date.now()).toLocaleDateString()}</span>
                          </div>

                          <h4 className="fw-bold mb-2 text-dark" style={{ minHeight: '52px', lineHeight: '1.4' }}>
                            {b.title}
                          </h4>

                          <p className="text-muted small flex-grow-1 mb-4" style={{ lineHeight: '1.6' }}>
                            {b.excerpt || b.content?.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                          </p>

                          <div className="pt-3 border-top mt-auto d-flex justify-content-end">
                            <Link
                              to={`/blog/${b.slug || b.id}`}
                              className="btn btn-sm btn-outline-primary rounded-pill px-4 fw-bold"
                              style={{ borderColor: '#4338CA', color: '#4338CA' }}
                            >
                              Read More &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </StaggerSequence>
              ) : (
                <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5 my-4">
                  <i className="fas fa-book-open fa-3x text-muted opacity-50 mb-3 d-block"></i>
                  <h4 className="fw-bold text-dark">No Articles Available Yet</h4>
                  <p className="text-muted mb-0">
                    New devotionals and faith articles will be published here soon. Stay blessed!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
