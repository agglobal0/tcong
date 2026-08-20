import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { StaggerSequence } from '../../components/common/StaggerSequence';

export const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public
      .getBlogs()
      .then((res) => setBlogs(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blog-page">
      <section className="bg-dark text-white py-5 text-center" style={{ background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)' }}>
        <div className="container py-4">
          <TextSequence
            text="Articles, Devotionals & Reflections"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-light opacity-90">Inspiration, faith teaching, and leadership reflections.</p>
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

