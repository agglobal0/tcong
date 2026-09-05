import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';


export const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public
      .getTestimonials()
      .then((res) => setTestimonials(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="testimonials-page">
      <Helmet>
        <title>Miracle Healing Testimonies | TCONG Melbourne | Pastor Jaskaran Heer Prayer Stories</title>
        <meta name="description" content="Read real miracle testimonies from TCONG Melbourne — healings, family restorations, financial breakthroughs & answered prayers through Pastor Jaskaran Heer's intercession." />
        <link rel="canonical" href="https://tcong-murex.vercel.app/testimonials" />
        <meta property="og:title" content="Miracle Testimonies | The Church of New Generation Melbourne" />
        <meta property="og:url" content="https://tcong-murex.vercel.app/testimonials" />
      </Helmet>
      <section className="bg-primary text-white py-5 text-center">
        <div className="container py-4">
          <h1 className="display-4 fw-bold mb-3 text-white">Miracle Testimonies &amp; Praise Reports</h1>
          <p className="lead text-white-50">Hear how God is healing, restoring, and transforming lives through TCONG Melbourne's intercession under Pastor Jaskaran Heer.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div className="row g-4">
              {testimonials.length > 0 ? (
                testimonials.map((t) => (
                  <div className="col-md-6" key={t.id}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                      <div className="text-warning mb-3">
                        <i className="fas fa-quote-left fs-2"></i>
                      </div>
                      <p className="lead text-secondary mb-4" style={{ fontStyle: 'italic' }}>
                        "{t.content}"
                      </p>
                      <div className="mt-auto">
                        <h6 className="fw-bold mb-0">{t.author_name}</h6>
                        <small className="text-muted">{t.title || 'Church Member'}</small>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted py-5">
                  Check back for encouraging testimonies from our church members!
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
