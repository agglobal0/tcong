import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { TextSequence } from '../../components/common/TextSequence';
import { StaggerSequence } from '../../components/common/StaggerSequence';

export const ServicesPage = () => {
  return (
    <div className="services-page">
      <Helmet>
        <title>Church Services & Healing Prayer Melbourne | TCONG Worship Times & Schedule</title>
        <meta
          name="description"
          content="Attend TCONG Melbourne's Sunday worship services in Hindi, English & Punjabi. Experience powerful worship, biblical preaching, and personal laying on of hands prayer with Pastor Jaskaran Heer."
        />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/services" />
        <meta property="og:title" content="Church Services & Laying on of Hands Prayer | TCONG Melbourne" />
        <meta
          property="og:description"
          content="Join us for Sunday worship, Wednesday miracle prayer night, and personal laying on of hands prayer ministry with Pastor Jaskaran Heer."
        />
        <meta property="og:image" content="/assets/laying-of-hands-prayer.jpg" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/services" />
      </Helmet>

      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
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
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#EEF2FF', color: '#3730A3', fontWeight: 'bold' }}
                >
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
          <div className="pt-2">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="text-center mb-5">
                <span
                  className="badge px-3 py-2 rounded-pill mb-2"
                  style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}
                >
                  WEEKLY GATHERINGS
                </span>
                <h3 className="fw-bold" style={{ color: '#581C87', fontSize: '2.2rem' }}>
                  Service Times & Details
                </h3>
              </div>
            </ScrollReveal>

            <StaggerSequence as="div" className="row g-4" initialDelay={200} staggerDelay={160} animation="fade-up">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-start bg-light">
                  <div className="badge bg-primary-subtle text-primary p-3 mb-3 rounded-4 w-auto d-inline-block">
                    <i className="fas fa-sun fs-3"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Sunday Worship Service</h4>
                  <p className="text-muted small fw-semibold">Every Sunday at 10:30 AM</p>
                  <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>
                    Dynamic praise & worship in Hindi, English & Punjabi, life-changing biblical sermon, personal prayer line, and Sunday community lunch.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-start bg-light">
                  <div className="badge bg-danger-subtle text-danger p-3 mb-3 rounded-4 w-auto d-inline-block">
                    <i className="fas fa-fire fs-3"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Wednesday Miracle & Prayer</h4>
                  <p className="text-muted small fw-semibold">Wednesdays at 6:30 PM - 8:00 PM</p>
                  <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>
                    In-depth Bible study, intense intercession, spiritual warfare, and personal prayer for healing, deliverance, and breakthroughs.
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
                    Empowering teens and young adults with biblical truth, authentic fellowship, worship, and leadership mentoring for the next generation.
                  </p>
                </div>
              </div>
            </StaggerSequence>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION: LAYING ON OF HANDS & HEALING PRAYER ═══════ */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            {/* Layhand Photo */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-xl border border-light img-reveal-wrapper">
                  <img
                    src="/assets/laying-of-hands-prayer.jpg"
                    alt="Laying on of Hands & Healing Prayer - Pastor Jaskaran Heer"
                    className="w-100 h-auto rounded-4"
                    style={{ maxHeight: '460px', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center gap-2"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.92) 100%)',
                    }}
                  >
                    <i className="fas fa-hands-praying text-warning fs-4"></i>
                    <div>
                      <small className="fw-bold d-block text-white">Laying on of Hands & Pastoral Prayer</small>
                      <small className="text-white-50">Praying for divine healing, deliverance & breakthroughs</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Layhand Content */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}
                >
                  BIBLICAL MINISTRY OF HEALING
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#581C87', fontSize: '2.2rem' }}>
                  Laying on of Hands & Healing Prayer
                </h2>

                <div
                  className="p-3 rounded-3 mb-3"
                  style={{
                    backgroundColor: '#FAF5FF',
                    borderLeft: '4px solid #7E22CE',
                  }}
                >
                  <p className="fst-italic fw-semibold mb-1" style={{ color: '#581C87', fontSize: '1rem', lineHeight: '1.6' }}>
                    “They shall lay hands on the sick, and they shall recover.”
                  </p>
                  <span className="d-block fw-bold" style={{ color: '#7E22CE', fontSize: '0.85rem' }}>
                    — Mark 16:18
                  </span>
                </div>

                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
                  At Church of New Generation, we firmly believe in the active, supernatural power of Jesus Christ to heal, deliver, and restore every wounded heart and afflicted body.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  During our Sunday services and miracle prayer gatherings, Pastor <strong>Jaskaran Heer</strong> and the prayer ministry team personally minister through the biblical practice of <strong>laying on of hands</strong> and intercession. No matter what physical ailment, emotional struggle, financial burden, or spiritual barrier you are facing, God is ready to touch your life.
                </p>

                {/* 3 Core Pillars of Prayer Ministry */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-sm-4">
                    <div className="p-3 rounded-3 bg-white border border-light shadow-sm text-center h-100">
                      <i className="fas fa-heartbeat text-danger fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A', fontSize: '0.95rem' }}>Physical Healing</h6>
                      <small className="text-muted">Freedom from sickness & pain</small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="p-3 rounded-3 bg-white border border-light shadow-sm text-center h-100">
                      <i className="fas fa-dove text-primary fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A', fontSize: '0.95rem' }}>Inner Peace</h6>
                      <small className="text-muted">Restoration from grief & anxiety</small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="p-3 rounded-3 bg-white border border-light shadow-sm text-center h-100">
                      <i className="fas fa-unlock-alt text-success fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A', fontSize: '0.95rem' }}>Breakthrough</h6>
                      <small className="text-muted">Deliverance & open doors</small>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  <Link to="/prayer-request" className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm" style={{ backgroundColor: '#6B21A8', borderColor: '#581C87' }}>
                    <i className="fas fa-praying-hands me-2"></i> Send Prayer Request
                  </Link>
                  <Link to="/contact" className="btn btn-outline-dark fw-bold px-4 py-2 rounded-pill shadow-sm">
                    <i className="fas fa-map-marker-alt me-2"></i> Attend Service in Person
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
