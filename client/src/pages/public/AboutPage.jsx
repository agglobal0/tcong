import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { TextSequence } from '../../components/common/TextSequence';
import { StaggerSequence } from '../../components/common/StaggerSequence';


export const AboutPage = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>About TCONG Melbourne | Pastor Jaskaran Heer | Church of New Generation</title>
        <meta name="description" content="Discover TCONG Melbourne's story — a multi-ethnic Hindi, English & Punjabi Christian church led by Pastor Jaskaran Heer in Coolaroo, VIC. Our faith, vision & core values." />
        <link rel="canonical" href="https://tcong-murex.vercel.app/about" />
        <meta property="og:title" content="About The Church of New Generation Melbourne | Pastor Jaskaran Heer" />
        <meta property="og:url" content="https://tcong-murex.vercel.app/about" />
      </Helmet>
      {/* ═══════ HERO BANNER ═══════ */}
      <section className="bg-dark text-white py-5 text-center" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)' }}>
        <div className="container py-4">
          <TextSequence
            text="About TCONG — Our Church, Ministry & Story"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-light opacity-90 max-w-xl mx-auto" style={{ maxWidth: '600px' }}>
              Discover our story, leadership, core beliefs, and commitment to expanding God's kingdom.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ HISTORY & CONGREGATION PHOTO SECTION ═══════ */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center mb-5">
            <div className="col-lg-6">
              <ScrollReveal animation="fade-right" delay={100}>
                <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}>
                  OUR JOURNEY & FAITH
                </span>
                <h2 className="fw-bold mb-4" style={{ color: '#581C87', fontSize: '2.4rem' }}>Our History & Legacy</h2>
                <p className="text-muted lead mb-3">
                  Founded with a passion to reach the next generation, The Church of New Generation has grown into a vibrant, multi-ethnic body of believers.
                </p>
                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Our vision is rooted in Matthew 28:19–20 — making disciples, fostering strong Christian families, and being light and salt in our community. We emphasize passionate worship, solid biblical teaching, sincere prayer, and compassionate outreach.
                </p>
              </ScrollReveal>
            </div>
            
            {/* Congregation Photo with Animation */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={200}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/about-us.jpg"
                    alt="Our Church Family Worshipping"
                    className="w-100 h-auto rounded-4"
                    style={{ objectFit: 'cover', maxHeight: '420px' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center gap-2"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                    }}
                  >
                    <i className="fas fa-users text-warning fs-5"></i>
                    <div>
                      <small className="fw-bold d-block text-white">Our Worshipping Family</small>
                      <small className="text-white-50">United in prayer, praise & fellowship</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* ═══════ CORE VALUES SECTION ═══════ */}
          <div className="pt-4">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="text-center mb-5">
                <span className="badge px-3 py-2 rounded-pill mb-2" style={{ backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 'bold' }}>
                  GUIDING PRINCIPLES
                </span>
                <h3 className="fw-bold" style={{ color: '#0F172A', fontSize: '2rem' }}>Our Core Values</h3>
              </div>
            </ScrollReveal>

            <StaggerSequence as="div" className="row g-4" staggerDelay={160} animation="fade-up">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-start bg-light">
                  <div className="mb-3 text-primary fs-3">
                    <i className="fas fa-heart" style={{ color: '#7E22CE' }}></i>
                  </div>
                  <h4 className="fw-bold mb-2">Unconditional Love & Belonging</h4>
                  <p className="text-muted mb-0 small" style={{ lineHeight: '1.6' }}>
                    Every person matters to God and is welcomed into our church family with open arms and warmth.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-start bg-light">
                  <div className="mb-3 text-primary fs-3">
                    <i className="fas fa-book-open" style={{ color: '#2563EB' }}></i>
                  </div>
                  <h4 className="fw-bold mb-2">Biblical Truth</h4>
                  <p className="text-muted mb-0 small" style={{ lineHeight: '1.6' }}>
                    The Word of God is our unchanging foundation for faith, doctrine, holy living, and spiritual growth.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-start bg-light">
                  <div className="mb-3 text-primary fs-3">
                    <i className="fas fa-hands-helping" style={{ color: '#059669' }}></i>
                  </div>
                  <h4 className="fw-bold mb-2">Servant Leadership</h4>
                  <p className="text-muted mb-0 small" style={{ lineHeight: '1.6' }}>
                    Serving God by serving others in practical, transformative ways across our local communities.
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


