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
          content="Church of New Generation is a Christ-centered family built on faith, prayer, and God's Word. Discover our calling, leadership by Pastor Jaskaran Heer, vision, and heart for God's people."
        />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/about" />
        <meta property="og:title" content="About Church of New Generation | Pastor Jaskaran Heer" />
        <meta
          property="og:description"
          content="A church born from a calling. Discover our journey of faith, servant leadership, vision, and how lives are transformed through Jesus Christ."
        />
        <meta property="og:image" content="/assets/about-us.jpg" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/about" />
      </Helmet>

      {/* ═══════ HERO BANNER (Standard Site Theme) ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-4">
          <TextSequence
            text="About Church of New Generation"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-white-50 max-w-xl mx-auto mb-0" style={{ maxWidth: '680px' }}>
              A church family built on faith, prayer, and the Word of God — reaching generations with the transforming love of Jesus Christ.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ SECTION 1: A CHURCH BORN FROM A CALLING ═══════ */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <ScrollReveal animation="fade-right" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}
                >
                  OUR BEGINNING & FAITH
                </span>
                <h2 className="fw-bold mb-4" style={{ color: '#581C87', fontSize: '2.2rem' }}>
                  A Church Born from a Calling
                </h2>
                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7' }}>
                  <strong>Church of New Generation</strong> is more than a place where people gather for worship. It is a family built on faith, prayer, the Word of God, and the desire to see lives transformed through Jesus Christ.
                </p>

                {/* Key Revelation Quote Box */}
                <div
                  className="p-4 rounded-4 mb-4"
                  style={{
                    backgroundColor: '#FAF5FF',
                    borderLeft: '4px solid #7E22CE',
                  }}
                >
                  <i className="fas fa-quote-left fs-5 mb-2 d-block" style={{ color: '#7E22CE' }}></i>
                  <p className="fw-bold mb-0" style={{ color: '#581C87', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    “When God calls a person, He also gives them the strength and grace to walk through the journey He has prepared for them.”
                  </p>
                </div>

                <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                  Our vision is to reach people with the love of Christ, strengthen families, encourage the broken-hearted, and help a new generation discover the hope, purpose, and salvation found in Jesus.
                </p>
              </ScrollReveal>
            </div>

            {/* Congregation Photo */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={200}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/about-us.jpg"
                    alt="Our Church Family Worshipping Together"
                    className="w-100 h-auto rounded-4"
                    style={{ objectFit: 'cover', maxHeight: '430px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/slide-hall.jpg';
                    }}
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
                      <small className="text-white-50">United in faith, prayer & fellowship</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 2: THE CALLING OF PASTOR JASKARAN HEER ═══════ */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            {/* Pastor Photo */}
            <div className="col-lg-5 order-lg-2">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/slide-pastor.jpg"
                    alt="Pastor Jaskaran Heer"
                    className="w-100 h-auto rounded-4"
                    style={{ maxHeight: '450px', objectFit: 'cover', objectPosition: 'center top' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/pastor-prayer.jpg';
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.9) 100%)',
                    }}
                  >
                    <span className="badge bg-warning text-dark fw-bold px-2 py-1 mb-1">LEAD PASTOR</span>
                    <h5 className="fw-bold mb-0 text-white">Pastor Jaskaran Heer</h5>
                    <small className="text-white-50">Chosen to Serve • Called to Lead</small>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Pastor Calling Text */}
            <div className="col-lg-7 order-lg-1">
              <ScrollReveal animation="fade-right" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 'bold' }}
                >
                  LEADERSHIP & CALLING
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.1rem' }}>
                  The Calling of Pastor Jaskaran Heer
                </h2>

                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3"
                  style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: '600', fontSize: '0.9rem' }}
                >
                  <i className="fas fa-calendar-alt"></i>
                  <span>5 October 2025 — A New Chapter</span>
                </div>

                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7' }}>
                  On <strong>5 October 2025</strong>, Pastor <strong>Jaskaran Heer</strong> began a new chapter of his life by stepping forward to serve God and His people.
                </p>

                <p className="text-muted mb-3" style={{ lineHeight: '1.7' }}>
                  It was not simply the beginning of a position or a ministry. It was the beginning of a journey of <strong>faith, obedience, sacrifice, and calling</strong>.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  From the beginning, this journey was not easy. There were challenges, difficult situations, moments of uncertainty, and times when the road ahead seemed difficult to understand. Yet through every situation, Pastor Jaskaran continued to hold on to God and His calling.
                </p>

                <div
                  className="p-3 rounded-3 mb-0"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderLeft: '4px solid #0284C7',
                  }}
                >
                  <h6 className="fw-bold mb-1" style={{ color: '#0369A1' }}>
                    “God has chosen you.”
                  </h6>
                  <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>
                    Encouraged by men and women of God who witnessed his journey, these words were embraced not as reasons for pride, but as a sacred responsibility of humble obedience.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 3: A JOURNEY THROUGH CHALLENGES ═══════ */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            {/* Left Content */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-right" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontWeight: 'bold' }}
                >
                  FAITH & PERSEVERANCE
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.1rem' }}>
                  A Journey Through Challenges
                </h2>

                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7' }}>
                  Every calling comes with a cost.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Pastor Jaskaran's journey has included moments of struggle, opposition, disappointment, and difficulties. But instead of allowing difficulties to become the end of the story, he chose to press forward:
                </p>

                {/* 4 Pillars Grid */}
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <div className="p-3 rounded-3 bg-light border text-center">
                      <i className="fas fa-pray text-primary fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-0">He Prayed</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 rounded-3 bg-light border text-center">
                      <i className="fas fa-shield-alt text-success fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-0">He Trusted</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 rounded-3 bg-light border text-center">
                      <i className="fas fa-hourglass-half text-warning fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-0">He Waited</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 rounded-3 bg-light border text-center">
                      <i className="fas fa-hands text-info fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-0">He Kept Serving</h6>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-3 bg-light border-start border-4 border-warning">
                  <small className="text-muted d-block mb-1">
                    <strong>What looked like obstacles</strong> became opportunities to grow stronger in faith.
                  </small>
                  <small className="text-muted d-block mb-1">
                    <strong>What looked like closed doors</strong> became moments to trust God's timing.
                  </small>
                  <small className="text-muted d-block">
                    <strong>What seemed impossible</strong> became another reason to believe that <em>God was still working</em>.
                  </small>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Image */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/pastor-prayer.jpg"
                    alt="Prayer and Seeking God"
                    className="w-100 h-auto rounded-4"
                    style={{ maxHeight: '420px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/slide-prayer.jpg';
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                    }}
                  >
                    <small className="fw-bold d-block text-white">Dependent on God</small>
                    <small className="text-white-50">Taught patience, courage, and humility in every season</small>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 4: CHOSEN TO SERVE, CALLED TO LEAD ═══════ */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            {/* Worship image */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/worship-ministry.jpg"
                    alt="Serving God and Community"
                    className="w-100 h-auto rounded-4"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/slide-worship.jpg';
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.85) 100%)',
                    }}
                  >
                    <small className="fw-bold d-block text-white">Servant Leadership</small>
                    <small className="text-white-50">Leading people toward Jesus with love & compassion</small>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Text */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: 'bold' }}
                >
                  SERVANT LEADERSHIP
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.1rem' }}>
                  Chosen to Serve, Called to Lead
                </h2>

                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7' }}>
                  Pastor Jaskaran believes that leadership in God's Kingdom is not about being above people — it is about <strong>serving people</strong>.
                </p>

                <p className="text-muted mb-3" style={{ lineHeight: '1.7' }}>
                  The heart of his ministry is to lead people toward Jesus, encourage those who are struggling, pray for those who are hurting, and help people understand that their circumstances do not have the final word.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  His desire is to see families, young people, and individuals discover their God-given purpose and experience the love of God personally.
                </p>

                <div className="p-3 rounded-3 bg-white border border-light shadow-sm">
                  <small className="text-muted fw-semibold">
                    The journey that began on <strong>5 October 2025</strong> is not simply Pastor Jaskaran's personal story. It is part of a greater story — a story of <strong>God's faithfulness</strong>.
                  </small>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 5: OUR VISION (CONCISE & STREAMLINED) ═══════ */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="text-center mb-4">
            <ScrollReveal animation="fade-down" delay={100}>
              <span
                className="badge px-3 py-2 rounded-pill mb-2"
                style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}
              >
                OUR PURPOSE
              </span>
              <h2 className="fw-bold mb-2" style={{ color: '#581C87', fontSize: '2.2rem' }}>
                Our Vision
              </h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
                Building a Christ-centered community where lives and families are transformed through faith, worship, and the Word of God.
              </p>
            </ScrollReveal>
          </div>

          {/* Compact 6 Core Vision Pillars */}
          <StaggerSequence as="div" className="row g-3 mb-4" staggerDelay={100} animation="fade-up">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-light">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="fs-4" style={{ color: '#7E22CE' }}>
                    <i className="fas fa-cross"></i>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: '#0F172A' }}>Jesus at the Center</h6>
                </div>
                <p className="text-muted small mb-0">Christ is the foundation of our worship, preaching, and community.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-light">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="fs-4" style={{ color: '#2563EB' }}>
                    <i className="fas fa-praying-hands"></i>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: '#0F172A' }}>Worship & Prayer</h6>
                </div>
                <p className="text-muted small mb-0">Encountering God intimately through heartfelt prayer and worship.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-light">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="fs-4" style={{ color: '#059669' }}>
                    <i className="fas fa-book-open"></i>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: '#0F172A' }}>The Word of God</h6>
                </div>
                <p className="text-muted small mb-0">Biblical truth taught with clarity, conviction, and everyday application.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-light">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="fs-4" style={{ color: '#EA580C' }}>
                    <i className="fas fa-home"></i>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: '#0F172A' }}>Strengthening Families</h6>
                </div>
                <p className="text-muted small mb-0">Fostering strong Christian marriages and households built on faith.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-light">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="fs-4" style={{ color: '#D97706' }}>
                    <i className="fas fa-bolt"></i>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: '#0F172A' }}>NextGen & Purpose</h6>
                </div>
                <p className="text-muted small mb-0">Guiding youth and believers to discover their God-given destiny.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-light">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="fs-4" style={{ color: '#E11D48' }}>
                    <i className="fas fa-heart"></i>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: '#0F172A' }}>Healing & Outreach</h6>
                </div>
                <p className="text-muted small mb-0">Restoring the broken-hearted and carrying Christ's light to all.</p>
              </div>
            </div>
          </StaggerSequence>

          {/* Definition of Church Row */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div
              className="p-4 rounded-4 text-center"
              style={{
                backgroundColor: '#FAF5FF',
                border: '1px solid #E9D5FF',
              }}
            >
              <h5 className="fw-bold mb-3" style={{ color: '#581C87' }}>
                We believe the Church is more than a building:
              </h5>
              <div className="row g-2 justify-content-center text-center">
                <div className="col-6 col-md-3">
                  <div className="p-2 bg-white rounded-3 shadow-sm border border-light">
                    <strong className="d-block" style={{ color: '#581C87' }}>A Family</strong>
                    <small className="text-muted">Where you belong</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-2 bg-white rounded-3 shadow-sm border border-light">
                    <strong className="d-block" style={{ color: '#581C87' }}>A Community</strong>
                    <small className="text-muted">United in faith & love</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-2 bg-white rounded-3 shadow-sm border border-light">
                    <strong className="d-block" style={{ color: '#581C87' }}>A Place of Hope</strong>
                    <small className="text-muted">Grace for your journey</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-2 bg-white rounded-3 shadow-sm border border-light">
                    <strong className="d-block" style={{ color: '#581C87' }}>A Light</strong>
                    <small className="text-muted">To the world</small>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ SECTION 6: OUR HEART — YOU ARE WELCOME HERE ═══════ */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/slide-hall.jpg"
                    alt="Our Fellowship and Gathering"
                    className="w-100 h-auto rounded-4"
                    style={{ maxHeight: '380px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/about-us.jpg';
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.85) 100%)',
                    }}
                  >
                    <small className="fw-bold d-block text-white">A Home for Every Generation</small>
                    <small className="text-white-50">Come as you are and encounter God</small>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontWeight: 'bold' }}
                >
                  OUR HEART FOR YOU
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.1rem' }}>
                  Our Heart
                </h2>

                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7' }}>
                  Our prayer is that every person who walks through our doors feels <strong>welcomed, loved, and valued</strong>.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Whether you are strong in your faith, searching for answers, going through a difficult season, or simply looking for a place where you belong — <strong>you are welcome here</strong>.
                </p>

                <div
                  className="p-3 rounded-3 mb-3"
                  style={{
                    backgroundColor: '#FEF3C7',
                    borderLeft: '4px solid #F59E0B',
                  }}
                >
                  <p className="fw-bold text-dark mb-0 small" style={{ lineHeight: '1.6' }}>
                    “We believe that no person's past is greater than God's grace, no situation is beyond His power, and no life is without purpose.”
                  </p>
                </div>

                <p className="text-muted mb-0 small" style={{ lineHeight: '1.6' }}>
                  Our story is still being written. And we believe that the same God who called us to begin this journey will continue to lead us forward.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 7: FROM ONE CALLING TO A GROWING FAMILY (CLOSING & CTA) ═══════ */}
      <section
        className="py-5 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)' }}
      >
        <div className="container py-4">
          <ScrollReveal animation="fade-up" delay={100}>
            <span
              className="badge px-3 py-2 rounded-pill mb-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FEF08A' }}
            >
              FROM ONE CALLING TO A GROWING FAMILY
            </span>
            <h2 className="fw-bold mb-3 text-white">We are Church of New Generation</h2>
            <p className="lead text-white-50 mx-auto mb-4" style={{ maxWidth: '640px' }}>
              What began with a step of faith is becoming a growing family of believers passionate about loving God and serving people.
            </p>

            <div className="p-4 rounded-4 mx-auto mb-4" style={{ maxWidth: '700px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <h5 className="fw-bold text-warning mb-2">Called to Serve • Built on Faith • Led by Christ • Living for His Purpose</h5>
              <small className="text-white-50 fw-semibold">To God be all the glory.</small>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/services" className="btn btn-warning fw-bold px-4 py-2 rounded-pill shadow-sm">
                <i className="fas fa-church me-2"></i> Join Our Services
              </Link>
              <Link to="/prayer-request" className="btn btn-outline-light fw-bold px-4 py-2 rounded-pill shadow-sm">
                <i className="fas fa-praying-hands me-2"></i> Request Prayer
              </Link>
              <Link to="/contact" className="btn btn-light fw-bold px-4 py-2 rounded-pill shadow-sm">
                <i className="fas fa-envelope me-2"></i> Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
