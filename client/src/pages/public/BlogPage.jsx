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

  const loadBlogs = (retryCount = 0) => {
    setLoading(true);
    api.public
      .getBlogs()
      .then((res) => {
        const list = res.data || [];
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
    <div className="blog-page">
      <Helmet>
        <title>Christian Devotionals & Faith Articles | TCONG Melbourne Blog</title>
        <meta name="description" content="Read inspiring Christian devotionals, faith reflections, and biblical teaching articles from The Church of New Generation Melbourne and Pastor Jaskaran Heer's ministry." />
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

      <section className="py-5">
        <div className="container py-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div>
              {blogs.length > 0 ? (
                <StaggerSequence as="div" className="row g-4" initialDelay={100} staggerDelay={150} animation="fade-up">
                  {blogs.map((b) => (
                    <div className="col-md-6 col-lg-4" key={b.id}>
                      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden img-reveal-wrapper">
                        {b.featured_image && (
                          <img src={b.featured_image} alt={b.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                        )}
                        <div className="card-body p-4 d-flex flex-column">
                          <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">
                            {b.category_name || b.category || 'Devotional'}
                          </span>
                          <h4 className="fw-bold mb-2">{b.title}</h4>
                          <p className="text-muted small flex-grow-1">{b.excerpt || b.content?.substring(0, 120)}...</p>
                          <Link to={`/blog/${b.slug || b.id}`} className="btn btn-sm btn-outline-primary mt-3 rounded-pill fw-semibold">
                            Read Full Article &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </StaggerSequence>
              ) : (
                <div className="col-12 text-center text-muted py-5">
                  No blog posts found. Please check back soon!
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

