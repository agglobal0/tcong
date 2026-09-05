import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { StaggerSequence } from '../../components/common/StaggerSequence';


export const SermonsPage = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public
      .getSermons()
      .then((res) => setSermons(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="sermons-page">
      <Helmet>
        <title>Pastor Jaskaran Heer Sermons Online | Hindi Christian Preaching | TCONG Melbourne</title>
        <meta name="description" content="Watch Pastor Jaskaran Heer's anointed Hindi & English sermons online. Healing, faith, prayer & deliverance messages from TCONG Melbourne's sermon archive." />
        <link rel="canonical" href="https://tcong-murex.vercel.app/sermons" />
        <meta property="og:title" content="Pastor Jaskaran Heer Sermons | TCONG Melbourne" />
        <meta property="og:url" content="https://tcong-murex.vercel.app/sermons" />
      </Helmet>
      <section className="bg-dark text-white py-5 text-center" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #311B92 100%)' }}>
        <div className="container py-4">
          <TextSequence
            text="Pastor Jaskaran Heer — Hindi & English Sermon Archive"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-light opacity-90">Watch, listen, and grow with anointed message archives.</p>
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
              {sermons.length > 0 ? (
                <StaggerSequence as="div" className="row g-4" initialDelay={100} staggerDelay={150} animation="fade-up">
                  {sermons.map((s) => (
                    <div className="col-md-6 col-lg-4" key={s.id}>
                      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="ratio ratio-16x9">
                          {s.youtube_url ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${s.youtube_url.includes('v=') ? s.youtube_url.split('v=')[1].split('&')[0] : s.youtube_url}`}
                              title={s.title}
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <img
                              src={s.thumbnail_url || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80'}
                              alt={s.title}
                              style={{ objectFit: 'cover' }}
                            />
                          )}
                        </div>
                        <div className="card-body p-4">
                          <span className="badge bg-primary-subtle text-primary mb-2">{s.category || 'Worship Service'}</span>
                          <h4 className="fw-bold mb-2">{s.title}</h4>
                          <p className="text-muted small mb-2">Speaker: {s.speaker || 'Pastor'}</p>
                          <p className="text-secondary small mb-0">{s.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </StaggerSequence>
              ) : (
                <div className="col-12 text-center text-muted py-5">
                  No sermons currently available.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

