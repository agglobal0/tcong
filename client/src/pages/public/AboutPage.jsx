import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { TextSequence } from '../../components/common/TextSequence';
import { StaggerSequence } from '../../components/common/StaggerSequence';

export const AboutPage = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>About Us | Church of New Generation | Pastor Jaskaran Heer Melbourne</title>
        <meta
          name="description"
          content="Church of New Generation is a Christ-centered family built on faith, prayer, and God's Word. Discover our calling, leadership by Pastor Jaskaran Heer, vision, and heart for the community."
        />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/about" />
        <meta property="og:title" content="About Church of New Generation | Pastor Jaskaran Heer" />
        <meta
          property="og:description"
          content="A church born from a calling. Discover our journey of faith, servant leadership, vision, and how lives are being transformed through Jesus Christ."
        />
        <meta property="og:image" content="/assets/about-us.jpg" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/about" />
      </Helmet>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="text-white py-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 50%, #0F172A 100%)',
          minHeight: '460px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#14B8A6 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        ></div>

        <div className="container py-5 position-relative">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <ScrollReveal animation="fade-down" delay={50}>
                <span
                  className="badge px-4 py-2 rounded-pill mb-3 text-uppercase"
                  style={{
                    backgroundColor: 'rgba(20, 184, 166, 0.18)',
                    color: '#2DD4BF',
                    border: '1px solid rgba(45, 212, 191, 0.35)',
                    letterSpacing: '1.5px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                  }}
                >
                  A Church Born From A Calling
                </span>
              </ScrollReveal>

              <TextSequence
                text="About Church of New Generation"
                as="h1"
                className="display-4 fw-bold mb-4 text-white"
                delay={100}
                wordDelay={70}
              />

              <ScrollReveal animation="fade-up" delay={250}>
                <p
                  className="lead text-light opacity-90 mx-auto mb-4"
                  style={{ maxWidth: '820px', fontSize: '1.25rem', lineHeight: '1.8' }}
                >
                  <strong>Church of New Generation</strong> is more than a place where people gather for worship.
                  It is a family built on faith, prayer, the Word of God, and the desire to see lives transformed through Jesus Christ.
                </p>
              </ScrollReveal>

              {/* Central Scripture / Calling Card */}
              <ScrollReveal animation="zoom-in" delay={350}>
                <div
                  className="p-4 rounded-4 mx-auto text-center position-relative shadow-lg mt-3"
                  style={{
                    maxWidth: '780px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <i className="fas fa-quote-left text-warning fs-3 mb-2 opacity-75 d-block"></i>
                  <p
                    className="fst-italic text-white fw-semibold mb-2"
                    style={{ fontSize: '1.2rem', lineHeight: '1.7', letterSpacing: '0.3px' }}
                  >
                    “When God calls a person, He also gives them the strength and grace to walk through the journey He has prepared for them.”
                  </p>
                  <span className="badge rounded-pill bg-warning text-dark px-3 py-1 fw-bold">
                    Rooted in Faith & Grace
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. CORE VISION SNAPSHOT BADGES
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-4 bg-light border-bottom">
        <div className="container">
          <div className="row g-3 justify-content-center text-center">
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white rounded-3 shadow-sm h-100 border border-light">
                <i className="fas fa-heart text-danger fs-4 mb-2"></i>
                <h6 className="fw-bold mb-1" style={{ color: '#0F172A' }}>Love of Christ</h6>
                <small className="text-muted">Reaching every heart with His grace</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white rounded-3 shadow-sm h-100 border border-light">
                <i className="fas fa-home text-primary fs-4 mb-2"></i>
                <h6 className="fw-bold mb-1" style={{ color: '#0F172A' }}>Strengthening Families</h6>
                <small className="text-muted">Building households on God's Word</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white rounded-3 shadow-sm h-100 border border-light">
                <i className="fas fa-hands-helping text-success fs-4 mb-2"></i>
                <h6 className="fw-bold mb-1" style={{ color: '#0F172A' }}>Encouraging the Broken</h6>
                <small className="text-muted">Hope, healing and sincere comfort</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white rounded-3 shadow-sm h-100 border border-light">
                <i className="fas fa-fire text-warning fs-4 mb-2"></i>
                <h6 className="fw-bold mb-1" style={{ color: '#0F172A' }}>Next Generation</h6>
                <small className="text-muted">Discovering purpose & salvation in Jesus</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. THE CALLING OF PASTOR JASKARAN HEER
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row g-5 align-items-center">
            {/* Image Column */}
            <div className="col-lg-5 order-lg-2">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative">
                  <div
                    className="position-absolute rounded-4 w-100 h-100"
                    style={{
                      top: '16px',
                      left: '16px',
                      background: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
                      zIndex: 0,
                    }}
                  ></div>
                  <div
                    className="position-relative rounded-4 overflow-hidden shadow-2xl border border-light bg-white"
                    style={{ zIndex: 1 }}
                  >
                    <img
                      src="/assets/slide-pastor.jpg"
                      alt="Pastor Jaskaran Heer - Church of New Generation"
                      className="w-100 h-auto"
                      style={{
                        maxHeight: '520px',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/pastor-prayer.jpg';
                      }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 end-0 p-4 text-white"
                      style={{
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.92) 100%)',
                      }}
                    >
                      <span className="badge bg-warning text-dark fw-bold px-3 py-1 mb-1">
                        LEAD PASTOR
                      </span>
                      <h4 className="fw-bold mb-0 text-white">Pastor Jaskaran Heer</h4>
                      <small className="text-light opacity-90">
                        Called to Serve • Built on Faith • Led by Christ
                      </small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Text Column */}
            <div className="col-lg-7 order-lg-1">
              <ScrollReveal animation="fade-right" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#CCFBF1', color: '#0F766E', fontWeight: '700' }}
                >
                  THE CALLING
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.3rem' }}>
                  The Calling of Pastor Jaskaran Heer
                </h2>

                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4"
                  style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: '600', fontSize: '0.95rem' }}
                >
                  <i className="fas fa-calendar-check"></i>
                  <span>5 October 2025 — A New Chapter Began</span>
                </div>

                <p className="lead text-muted mb-3" style={{ lineHeight: '1.8' }}>
                  On <strong>5 October 2025</strong>, Pastor <strong>Jaskaran Heer</strong> began a new chapter of his life by stepping forward to serve God and His people.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  It was not simply the beginning of a position or a ministry. It was the beginning of a journey of <strong>faith, obedience, sacrifice, and calling</strong>.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  From the beginning, this journey was not easy. There were challenges, difficult situations, moments of uncertainty, and times when the road ahead seemed difficult to understand. Yet through every situation, Pastor Jaskaran continued to hold on to God and His calling.
                </p>

                {/* Quote Box */}
                <div
                  className="p-4 rounded-3 border-start border-4 mb-4"
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderColor: '#0D9488',
                    borderLeftWidth: '5px',
                  }}
                >
                  <p className="fw-bold mb-2" style={{ color: '#0F766E', fontSize: '1.25rem' }}>
                    “God has chosen you.”
                  </p>
                  <p className="text-muted mb-0 small" style={{ lineHeight: '1.7' }}>
                    Many men and women of God who met him and witnessed his journey encouraged him with these words. These words were not taken as a reason for pride, but as a responsibility — a reminder that serving God is not about personal recognition, but about obedience and serving people with humility.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. A JOURNEY THROUGH CHALLENGES
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
          borderTop: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            {/* Left Content */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontWeight: '700' }}
                >
                  FAITH TESTED IN FIRE
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.2rem' }}>
                  A Journey Through Challenges
                </h2>

                <p className="lead text-muted mb-3" style={{ lineHeight: '1.8' }}>
                  Every calling comes with a cost.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  Pastor Jaskaran's journey has included moments of struggle, opposition, disappointment, and difficulties that could have caused him to give up. There were times when the path was not clear and when faith had to be stronger than circumstances.
                </p>

                <p className="text-muted fw-semibold mb-4">
                  But instead of allowing difficulties to become the end of the story, he chose to continue.
                </p>

                {/* 4 Pillars of Perseverance */}
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <div className="p-3 bg-white rounded-3 shadow-sm border-start border-3 border-teal h-100">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="fas fa-pray text-teal fs-5" style={{ color: '#0D9488' }}></i>
                        <h6 className="fw-bold mb-0 text-dark">He Prayed</h6>
                      </div>
                      <small className="text-muted">Seeking God in the secret place</small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="p-3 bg-white rounded-3 shadow-sm border-start border-3 border-teal h-100">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="fas fa-shield-alt text-teal fs-5" style={{ color: '#0D9488' }}></i>
                        <h6 className="fw-bold mb-0 text-dark">He Trusted</h6>
                      </div>
                      <small className="text-muted">Standing firm on God's word</small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="p-3 bg-white rounded-3 shadow-sm border-start border-3 border-teal h-100">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="fas fa-hourglass-half text-teal fs-5" style={{ color: '#0D9488' }}></i>
                        <h6 className="fw-bold mb-0 text-dark">He Waited</h6>
                      </div>
                      <small className="text-muted">Trusting God's perfect timing</small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="p-3 bg-white rounded-3 shadow-sm border-start border-3 border-teal h-100">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="fas fa-hands text-teal fs-5" style={{ color: '#0D9488' }}></i>
                        <h6 className="fw-bold mb-0 text-dark">He Kept Serving</h6>
                      </div>
                      <small className="text-muted">Faithful in every season</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Side: Visual Reflection Card & Image */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-right" delay={200}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg mb-4">
                  <img
                    src="/assets/pastor-prayer.jpg"
                    alt="Prayer and Intercession - Pastor Jaskaran Heer"
                    className="w-100 h-auto"
                    style={{ maxHeight: '320px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/slide-prayer.jpg';
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.85) 100%)',
                    }}
                  >
                    <small className="fw-bold d-block text-warning">THE PREPARATION IN THE SECRET PLACE</small>
                    <small className="text-white-50">Through every challenge, God was teaching patience, courage & humility</small>
                  </div>
                </div>

                {/* 3 Lessons Box */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                  <h6 className="fw-bold text-uppercase mb-3" style={{ color: '#0F766E', letterSpacing: '1px' }}>
                    How God Transformed the Difficulties:
                  </h6>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                    <li className="d-flex align-items-start gap-3">
                      <span className="badge rounded-circle bg-teal-subtle text-teal p-2" style={{ backgroundColor: '#CCFBF1', color: '#0F766E' }}>
                        <i className="fas fa-check"></i>
                      </span>
                      <div>
                        <strong>What looked like obstacles</strong> became opportunities to grow stronger in faith.
                      </div>
                    </li>
                    <li className="d-flex align-items-start gap-3">
                      <span className="badge rounded-circle bg-teal-subtle text-teal p-2" style={{ backgroundColor: '#CCFBF1', color: '#0F766E' }}>
                        <i className="fas fa-check"></i>
                      </span>
                      <div>
                        <strong>What looked like closed doors</strong> became moments to trust God's timing.
                      </div>
                    </li>
                    <li className="d-flex align-items-start gap-3">
                      <span className="badge rounded-circle bg-teal-subtle text-teal p-2" style={{ backgroundColor: '#CCFBF1', color: '#0F766E' }}>
                        <i className="fas fa-check"></i>
                      </span>
                      <div>
                        <strong>What seemed impossible</strong> became another reason to believe that <em>God was still working</em>.
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. CHOSEN TO SERVE, CALLED TO LEAD
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            {/* Image on Left */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-xl border border-light">
                  <img
                    src="/assets/worship-ministry.jpg"
                    alt="Leading in Worship and Ministry"
                    className="w-100 h-auto"
                    style={{ maxHeight: '420px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/slide-worship.jpg';
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.9) 100%)',
                    }}
                  >
                    <h6 className="fw-bold text-white mb-1">Serving with Humility & Love</h6>
                    <small className="text-light opacity-90">
                      Leadership in God's Kingdom is about serving people and leading them toward Jesus.
                    </small>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Content on Right */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: '700' }}
                >
                  SERVANT LEADERSHIP
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.2rem' }}>
                  Chosen to Serve, Called to Lead
                </h2>

                <p className="lead text-muted mb-3" style={{ lineHeight: '1.8' }}>
                  Pastor Jaskaran believes that leadership in God's Kingdom is not about being above people — it is about <strong>serving people</strong>.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  The heart of his ministry is to lead people toward Jesus, encourage those who are struggling, pray for those who are hurting, and help people understand that their circumstances do not have the final word.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  His desire is to see people experience the love of God personally and to see families, young people, and individuals discover their God-given purpose.
                </p>

                <div
                  className="p-3 rounded-3 shadow-sm"
                  style={{
                    backgroundColor: '#F0FDFA',
                    borderLeft: '4px solid #14B8A6',
                  }}
                >
                  <p className="mb-0 text-dark fw-semibold" style={{ lineHeight: '1.6' }}>
                    The journey that began on <strong>5 October 2025</strong> is therefore not simply Pastor Jaskaran's personal story. It is part of a greater story — a story of <strong>God's faithfulness</strong>.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. OUR VISION (9 Pillars + Church definition)
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-5 text-white position-relative"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        }}
      >
        <div className="container py-4">
          <div className="text-center mb-5">
            <ScrollReveal animation="fade-down" delay={100}>
              <span
                className="badge px-4 py-2 rounded-pill mb-3"
                style={{
                  backgroundColor: 'rgba(20, 184, 166, 0.2)',
                  color: '#2DD4BF',
                  border: '1px solid rgba(45, 212, 191, 0.3)',
                  fontWeight: '700',
                  letterSpacing: '1px',
                }}
              >
                OUR CALLING & DESTINY
              </span>
              <h2 className="display-5 fw-bold mb-3 text-white">Our Vision</h2>
              <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: '720px' }}>
                At Church of New Generation, we desire to build a Christ-centered community where lives are transformed by the power of the Gospel.
              </p>
            </ScrollReveal>
          </div>

          {/* 9 Vision Pillars */}
          <StaggerSequence as="div" className="row g-4 mb-5" staggerDelay={90} animation="fade-up">
            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#2DD4BF' }}>
                  <i className="fas fa-cross"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">Jesus at the Center</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  Jesus Christ is at the center of everything we do, preach, and live out daily.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#FBBF24' }}>
                  <i className="fas fa-praying-hands"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">Encounter God</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  A sacred space where people encounter God personally through passionate worship and prayer.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#60A5FA' }}>
                  <i className="fas fa-bible"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">The Word Taught & Lived</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  Uncompromising biblical truth that is clearly taught, embraced, and practiced in every walk of life.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#F472B6' }}>
                  <i className="fas fa-users"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">Strengthened Families</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  Marriages and families built strong through faith, biblical guidance, and loving support.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#A78BFA' }}>
                  <i className="fas fa-bolt"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">NextGen Empowered</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  Young people encouraged and mentored to follow Christ boldly in today's world.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#34D399' }}>
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">Hope for the Broken</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  The broken-hearted find genuine healing, comfort, acceptance, and encouragement.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#F97316' }}>
                  <i className="fas fa-compass"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">Discovering Purpose</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  Helping every believer recognize and walk into their unique God-given calling.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#38BDF8' }}>
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">Every Believer Serves</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  Every member mobilized and encouraged to serve others with compassion and humility.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 rounded-4 p-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-3 fs-3" style={{ color: '#FCD34D' }}>
                  <i className="fas fa-globe-asia"></i>
                </div>
                <h5 className="fw-bold text-white mb-2">Reaching Generations</h5>
                <p className="text-light opacity-75 mb-0 small" style={{ lineHeight: '1.6' }}>
                  Carrying the light of the Gospel to Melbourne, our community, and the generations beyond.
                </p>
              </div>
            </div>
          </StaggerSequence>

          {/* The Church is More than a Building Banner */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div
              className="p-4 p-lg-5 rounded-4 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(15,23,42,0.8) 100%)',
                border: '1px solid rgba(45,212,191,0.3)',
              }}
            >
              <h4 className="fw-bold text-teal mb-3" style={{ color: '#2DD4BF' }}>
                We believe the Church is not only a building.
              </h4>
              <div className="row g-3 justify-content-center text-center mt-2">
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded-3 bg-dark-subtle border border-secondary border-opacity-25 h-100">
                    <span className="fs-3 mb-1 d-block">👨‍👩‍👧‍👦</span>
                    <strong className="text-white d-block">A Family</strong>
                    <small className="text-light opacity-75">Where you belong</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded-3 bg-dark-subtle border border-secondary border-opacity-25 h-100">
                    <span className="fs-3 mb-1 d-block">🤝</span>
                    <strong className="text-white d-block">A Community</strong>
                    <small className="text-light opacity-75">United in love</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded-3 bg-dark-subtle border border-secondary border-opacity-25 h-100">
                    <span className="fs-3 mb-1 d-block">🕊️</span>
                    <strong className="text-white d-block">A Place of Hope</strong>
                    <small className="text-light opacity-75">Grace for every season</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded-3 bg-dark-subtle border border-secondary border-opacity-25 h-100">
                    <span className="fs-3 mb-1 d-block">💡</span>
                    <strong className="text-white d-block">A Light</strong>
                    <small className="text-light opacity-75">Carrying Christ to the world</small>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. OUR HEART — A PLACE WHERE YOU BELONG
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            {/* Congregation photo */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-2xl border border-light">
                  <img
                    src="/assets/about-us.jpg"
                    alt="Our Church Family - Church of New Generation"
                    className="w-100 h-auto rounded-4"
                    style={{ maxHeight: '460px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/slide-hall.jpg';
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.9) 100%)',
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <i className="fas fa-heart text-danger fs-4"></i>
                      <div>
                        <strong className="text-white d-block">You Are Welcome Here</strong>
                        <small className="text-white-50">A spiritual home for every generation</small>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Content */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-right" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontWeight: '700' }}
                >
                  OUR HEART FOR YOU
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.3rem' }}>
                  Our Heart
                </h2>

                <p className="lead text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  Our prayer is that every person who walks through our doors feels <strong>welcomed, loved, and valued</strong>.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  Whether you are strong in your faith, searching for answers, going through a difficult season, or simply looking for a place where you belong — <strong>you are welcome here</strong>.
                </p>

                <div
                  className="p-4 rounded-4 mb-4 shadow-sm"
                  style={{
                    backgroundColor: '#FEF3C7',
                    borderLeft: '5px solid #F59E0B',
                  }}
                >
                  <p className="fw-bold text-dark mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                    We believe that no person's past is greater than God's grace, no situation is beyond His power, and no life is without purpose.
                  </p>
                </div>

                <p className="text-muted mb-0" style={{ lineHeight: '1.8' }}>
                  Our story is still being written. And we believe that the same God who called us to begin this journey will continue to lead us forward.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          8. FROM ONE CALLING TO A GROWING FAMILY (CULMINATION)
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #0F766E 0%, #0F172A 100%)',
          color: '#ffffff',
        }}
      >
        <div className="container py-4 text-center">
          <ScrollReveal animation="fade-down" delay={100}>
            <span
              className="badge px-4 py-2 rounded-pill mb-3"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FEF08A',
                border: '1px solid rgba(254, 240, 138, 0.4)',
                fontWeight: '700',
              }}
            >
              HIS FAITHFULNESS
            </span>
            <h2 className="display-6 fw-bold text-white mb-3">
              From One Calling to a Growing Family
            </h2>
            <p className="lead text-light opacity-90 mx-auto mb-5" style={{ maxWidth: '780px', lineHeight: '1.8' }}>
              What began with a step of faith is becoming a growing family of people who desire to know God, follow Jesus, and serve others. The journey has not always been easy, but God has been faithful through it all.
            </p>
          </ScrollReveal>

          {/* 4 Faith Affirmations */}
          <div className="row g-4 justify-content-center mb-5 text-start">
            <div className="col-md-6 col-lg-3">
              <div
                className="p-4 rounded-4 h-100 shadow-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <div className="fs-3 mb-2" style={{ color: '#FCD34D' }}>
                  <i className="fas fa-mountain"></i>
                </div>
                <h6 className="fw-bold text-white mb-2">Strengthened Faith</h6>
                <p className="text-light opacity-75 small mb-0">Every challenge has strengthened our faith.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div
                className="p-4 rounded-4 h-100 shadow-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <div className="fs-3 mb-2" style={{ color: '#5EEAD4' }}>
                  <i className="fas fa-pray"></i>
                </div>
                <h6 className="fw-bold text-white mb-2">Closer in Prayer</h6>
                <p className="text-light opacity-75 small mb-0">Every prayer has brought us closer to God.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div
                className="p-4 rounded-4 h-100 shadow-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <div className="fs-3 mb-2" style={{ color: '#93C5FD' }}>
                  <i className="fas fa-comment-dots"></i>
                </div>
                <h6 className="fw-bold text-white mb-2">God's Faithfulness</h6>
                <p className="text-light opacity-75 small mb-0">Every testimony reminds us of His faithfulness.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div
                className="p-4 rounded-4 h-100 shadow-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <div className="fs-3 mb-2" style={{ color: '#F472B6' }}>
                  <i className="fas fa-user-plus"></i>
                </div>
                <h6 className="fw-bold text-white mb-2">Ever Growing</h6>
                <p className="text-light opacity-75 small mb-0">Every new person reminds us why we continue.</p>
              </div>
            </div>
          </div>

          {/* Grand Declaration Box */}
          <ScrollReveal animation="zoom-in" delay={250}>
            <div
              className="p-4 p-md-5 rounded-4 mx-auto text-center shadow-2xl"
              style={{
                maxWidth: '850px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(16px)',
                border: '2px solid rgba(254, 240, 138, 0.4)',
              }}
            >
              <h3 className="fw-bold text-warning mb-3" style={{ fontSize: '1.8rem', letterSpacing: '0.5px' }}>
                We are Church of New Generation.
              </h3>
              <p
                className="fw-semibold text-white mb-3"
                style={{ fontSize: '1.25rem', letterSpacing: '0.5px', lineHeight: '1.7' }}
              >
                Called to Serve. Built on Faith. Led by Christ. Living for His Purpose.
              </p>
              <p className="fw-bold text-teal mb-4 fs-5" style={{ color: '#5EEAD4', letterSpacing: '1px' }}>
                To God be all the glory.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link
                  to="/services"
                  className="btn btn-warning btn-lg fw-bold px-4 py-2 rounded-pill shadow-sm"
                >
                  <i className="fas fa-church me-2"></i> Join Our Services
                </Link>
                <Link
                  to="/prayer-request"
                  className="btn btn-outline-light btn-lg fw-bold px-4 py-2 rounded-pill shadow-sm"
                >
                  <i className="fas fa-praying-hands me-2"></i> Request Prayer
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-teal btn-lg fw-bold px-4 py-2 rounded-pill shadow-sm text-white"
                  style={{ backgroundColor: '#0D9488', border: '1px solid #14B8A6' }}
                >
                  <i className="fas fa-map-marker-alt me-2"></i> Connect With Us
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
