import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { TextSequence } from '../../components/common/TextSequence';
import { StaggerSequence } from '../../components/common/StaggerSequence';


export const ServicesPage = () => {
  return (
    <div className="services-page">
      <Helmet>
        <title>Sunday Hindi Church Services Melbourne | TCONG Worship Times & Schedule</title>
        <meta name="description" content="Attend TCONG Melbourne's Sunday worship services in Hindi, English & Punjabi. Weekly prayer nights, youth fellowship & healing services at Coolaroo VIC 3048. All are welcome." />
        <link rel="canonical" href="https://tcong-murex.vercel.app/services" />
        <meta property="og:title" content="Sunday Hindi Church Services Melbourne | TCONG" />
        <meta property="og:url" content="https://tcong-murex.vercel.app/services" />
      </Helmet>
      {/* ═══════ HERO BANNER ═══════ */}
      <section className="bg-primary text-white py-5 text-center" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}>
        <div className="container py-4">
          <TextSequence
            text="Our Services - Worship, Prayer & Fellowship"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-white-50 max-w-xl mx-auto" style={{ maxWidth: '650px' }}>
              Join us in person or online. Experience uplifting worship, powerful intercessory prayer, and transformative preaching.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ FEATURED WORSHIP TEAM PHOTO & EXPERIENCE ═══════ */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center mb-5">
            {/* Worship Team Image */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/services.jpg"
                    alt="Worship Team & Praise Ministry"
                    className="w-100 h-auto rounded-4"
                    style={{ objectFit: 'cover', maxHeight: '440px' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center gap-2"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                    }}
                  >
                    <i className="fas fa-music text-warning fs-5"></i>
                    <div>
                      <small className="fw-bold d-block text-white">Anointed Praise & Worship</small>
                      <small className="text-white-50">Leading God's people into divine presence</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Worship Description */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={200}>
                <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: '#EEF2FF', color: '#3730A3', fontWeight: 'bold' }}>
                  ATMOSPHERE OF FAITH & HEALINGS
                </span>
                <h2 className="fw-bold mb-4" style={{ color: '#1E1B4B', fontSize: '2.4rem' }}>
                  Encounter God's Presence Every Week
                </h2>
                <p className="text-muted lead mb-3">
                  Our services are centered on Spirit-led worship, biblical preaching, and personal prayer ministry for every family member.
                </p>
                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Whether you are seeking spiritual breakthrough, physical healing, or a place to call home, our doors and hearts are open. Come as you are and experience God's transformative love.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* ═══════ WEEKLY SERVICES SCHEDULE GRID ═══════ */}
          <div className="pt-4">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="text-center mb-5">
                <span className="badge px-3 py-2 rounded-pill mb-2" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}>
                  WEEKLY GATHERINGS
                </span>
                <h3 className="fw-bold" style={{ color: '#581C87', fontSize: '2.2rem' }}>Service Times & Details</h3>
              </div>
            </ScrollReveal>

            <StaggerSequence as="div" className="row g-4" initialDelay={200} staggerDelay={160} animation="fade-up">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-start bg-light">
                  <div className="badge bg-primary-subtle text-primary p-3 mb-3 rounded-4 w-auto d-inline-block">
                    <i className="fas fa-sun fs-3"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Sunday Worship Service</h4>
                  <p className="text-muted small fw-semibold">9:00 AM & 11:30 AM</p>
                  <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>
                    Dynamic praise & worship, inspirational preaching, and dedicated children’s church classes.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-start bg-light">
                  <div className="badge bg-danger-subtle text-danger p-3 mb-3 rounded-4 w-auto d-inline-block">
                    <i className="fas fa-fire fs-3"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Wednesday Miracle & Prayer</h4>
                  <p className="text-muted small fw-semibold">6:30 PM - 8:00 PM</p>
                  <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>
                    In-depth Bible study, prophetic intercession, and personal prayer for healing and breakthroughs.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-start bg-light">
                  <div className="badge bg-success-subtle text-success p-3 mb-3 rounded-4 w-auto d-inline-block">
                    <i className="fas fa-users fs-3"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Youth & NextGen Fellowship</h4>
                  <p className="text-muted small fw-semibold">Saturdays at 5:00 PM</p>
                  <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>
                    Empowering teens and young adults with biblical truth, fellowship, worship, and leadership training.
                  </p>
                </div>
              </div>
            </StaggerSequence>
          </div>
        </div>
      </section>
    </div>
  );
};


