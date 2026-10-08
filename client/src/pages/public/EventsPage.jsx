import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { StaggerSequence } from '../../components/common/StaggerSequence';


export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = (retryCount = 0) => {
    setLoading(true);
    api.public
      .getEvents()
      .then((res) => {
        const list = res.data || [];
        setEvents(list);
        if (list.length === 0 && retryCount < 2) {
          setTimeout(() => loadEvents(retryCount + 1), 2000);
        }
      })
      .catch((err) => {
        console.error(err);
        if (retryCount < 3) {
          setTimeout(() => loadEvents(retryCount + 1), 2500);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="events-page">
      <Helmet>
        <title>Church Events Melbourne 2025 | TCONG Upcoming Gatherings & Conferences</title>
        <meta name="description" content="Stay connected with The Church of New Generation Melbourne's upcoming events, special services, prayer conferences, and community gatherings. Join Pastor Jaskaran Heer's ministry." />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/events" />
        <meta property="og:title" content="Upcoming Church Events Melbourne | TCONG" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/events" />
        <meta property="og:image" content="https://www.churchofnewgeneration.com/assets/slide-hall.jpg" />
      </Helmet>
      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-4">
          <TextSequence
            text="Church Events & Gatherings"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-white-50 max-w-xl mx-auto mb-3" style={{ maxWidth: '720px' }}>
              Stay connected with upcoming worship services, healing conferences, prayer nights, and community gatherings in Melbourne.
            </p>
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <i className="fas fa-calendar-check text-warning"></i>
              <span className="fw-semibold text-white small">Upcoming Services • Conferences • Melbourne Gatherings</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <div>
              {events.length > 0 ? (
                <StaggerSequence as="div" className="row g-4" initialDelay={100} staggerDelay={150} animation="fade-up">
                  {events.map((evt) => (
                    <div className="col-md-6 col-lg-4" key={evt.id}>
                      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden img-reveal-wrapper">
                        {(evt.featured_image || evt.image_url) && (
                          <img src={evt.featured_image || evt.image_url} alt={evt.title} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} />
                        )}
                        <div className="card-body p-4 d-flex flex-column">
                          <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">
                            {evt.event_date ? new Date(evt.event_date).toLocaleDateString() : 'Upcoming'}
                          </span>
                          <h4 className="fw-bold mb-2">{evt.title}</h4>
                          <p className="text-muted small flex-grow-1">{evt.description}</p>
                          <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                            <small className="text-muted"><i className="fas fa-map-marker-alt text-danger me-1"></i> {evt.location || 'Church Main Sanctuary'}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </StaggerSequence>
              ) : (
                <div className="col-12 text-center text-muted py-5">
                  No events found. Please check back later!
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

