import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { StaggerSequence } from '../../components/common/StaggerSequence';

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public
      .getEvents()
      .then((res) => setEvents(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="events-page">
      <section className="bg-dark text-white py-5 text-center" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>
        <div className="container py-4">
          <TextSequence
            text="Upcoming & Special Church Events"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-light opacity-90">Stay connected with everything happening in our church family.</p>
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
                        {evt.image_url && (
                          <img src={evt.image_url} alt={evt.title} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} />
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

