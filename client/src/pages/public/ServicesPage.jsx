import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { TextSequence } from '../../components/common/TextSequence';
import { StaggerSequence } from '../../components/common/StaggerSequence';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const ServicesPage = () => {
  const { addToast } = useToast();
  const [showLayHandModal, setShowLayHandModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'health',
    attendance: 'in_person',
    request_text: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLayHandSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Please enter your full name', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      addToast('Please enter your contact phone or WhatsApp number', 'error');
      return;
    }
    if (!formData.request_text.trim()) {
      addToast('Please describe your prayer or healing need', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const attendanceLabel =
        formData.attendance === 'in_person'
          ? 'Attending Sunday Service In-Person (Coolaroo VIC)'
          : 'Requesting Phone / Intercessory Prayer';

      const fullRequestText = `[LAYING ON OF HANDS REQUEST]\nAttendance: ${attendanceLabel}\nHealing Focus: ${formData.category.toUpperCase()}\n\nPrayer Details:\n${formData.request_text.trim()}`;

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        category: formData.category,
        request_text: fullRequestText,
        is_anonymous: false,
        consent: true,
      };

      const res = await api.public.submitPrayerRequest(payload);
      if (res.success || res.status === 'success' || res.data) {
        setSubmitted(true);
        addToast('Laying on of hands prayer request submitted successfully!', 'success');
      } else {
        addToast(res.message || 'Failed to submit prayer request', 'error');
      }
    } catch (err) {
      addToast(err.message || 'Failed to submit prayer request. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      category: 'health',
      attendance: 'in_person',
      request_text: '',
    });
    setSubmitted(false);
    setShowLayHandModal(false);
  };
  return (
    <div className="services-page">
      <Helmet>
        <title>Sunday Church Services Melbourne | 10:00 AM – 2:00 PM | TCONG</title>
        <meta
          name="description"
          content="Join Church of New Generation every Sunday from 10:00 AM to 2:00 PM in Coolaroo, Melbourne. Anointed praise & worship, biblical sermon, laying on of hands healing prayer, and free fellowship lunch."
        />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/services" />
        <meta property="og:title" content="Sunday Church Services Melbourne | TCONG (10 AM - 2 PM)" />
        <meta
          property="og:description"
          content="Every Sunday 10:00 AM – 2:00 PM (Melbourne Time). Experience powerful worship, biblical preaching, laying on of hands healing prayer, and community fellowship lunch."
        />
        <meta property="og:image" content="/assets/services.jpg" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/services" />
      </Helmet>

      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-4">
          <TextSequence
            text="Our Services - Sunday Gathering"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-white-50 max-w-xl mx-auto mb-3" style={{ maxWidth: '720px' }}>
              Every Sunday from <strong>10:00 AM to 2:00 PM</strong> (Melbourne, Australia Time). Join us for inspiring worship, biblical preaching, personal healing prayer, and warm community fellowship.
            </p>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill" style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <i className="fas fa-clock text-warning"></i>
              <span className="fw-semibold text-white small">Sundays 10:00 AM – 2:00 PM AEST • All Welcome</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1: ANOINTED PRAISE & WORSHIP
          [Layout: Photo 1 on LEFT | Text on RIGHT]
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            {/* Left: Photo 1 (Worship Photo) */}
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
                      <small className="text-white-50">Leading God's people into His presence in Hindi, English & Punjabi</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Text Description */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#EEF2FF', color: '#3730A3', fontWeight: 'bold' }}
                >
                  ATMOSPHERE OF FAITH & PRAISE
                </span>
                <h2 className="fw-bold mb-4" style={{ color: '#1E1B4B', fontSize: '2.2rem' }}>
                  Encounter God's Presence in Worship
                </h2>
                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7' }}>
                  Our Sunday service begins with passionate, Spirit-led worship. We celebrate God's goodness through heartfelt songs in Hindi, English, and Punjabi.
                </p>
                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Whether you are seeking peace, spiritual renewal, or a closer walk with God, our atmosphere of faith will encourage your heart. We believe worship shifts atmospheres and opens hearts to receive God's Word.
                </p>
                <div className="p-3 rounded-3 bg-light border-start border-4 border-primary">
                  <small className="text-muted fw-semibold d-block">
                    <i className="fas fa-heart text-danger me-1"></i> A multicultural, welcoming fellowship where people of all backgrounds come together as one family in Christ.
                  </small>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2: LAYING ON OF HANDS & HEALING PRAYER
          [Layout: Text on LEFT | Photo 2 on RIGHT]
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            {/* Left: Layhand Content */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-right" delay={100}>
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
                  During our Sunday service, Pastor <strong>Jaskaran Heer</strong> and the prayer team minister individually through the biblical practice of <strong>laying on of hands</strong> and intercessory prayer.
                </p>

                {/* 3 Core Pillars */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-sm-4">
                    <div className="p-3 rounded-3 bg-white border border-light shadow-sm text-center h-100">
                      <i className="fas fa-heartbeat text-danger fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A', fontSize: '0.9rem' }}>Physical Healing</h6>
                      <small className="text-muted">Freedom from sickness</small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="p-3 rounded-3 bg-white border border-light shadow-sm text-center h-100">
                      <i className="fas fa-dove text-primary fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A', fontSize: '0.9rem' }}>Inner Peace</h6>
                      <small className="text-muted">Comfort & deliverance</small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="p-3 rounded-3 bg-white border border-light shadow-sm text-center h-100">
                      <i className="fas fa-unlock-alt text-success fs-4 mb-2"></i>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A', fontSize: '0.9rem' }}>Breakthrough</h6>
                      <small className="text-muted">Divine open doors</small>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setShowLayHandModal(true);
                    }}
                    className="btn fw-bold px-4 py-2 rounded-pill shadow-sm text-white d-inline-flex align-items-center gap-2"
                    style={{ backgroundColor: '#6B21A8', borderColor: '#581C87' }}
                  >
                    <i className="fas fa-hands-praying"></i>
                    <span>Request Laying on of Hands Prayer</span>
                  </button>
                  <Link to="/contact" className="btn btn-outline-dark fw-bold px-4 py-2 rounded-pill shadow-sm">
                    <i className="fas fa-map-marker-alt me-2"></i> Plan Your Visit
                  </Link>
                </div>

                <div
                  className="p-3 rounded-4 bg-white shadow-sm d-flex align-items-center justify-content-between gap-3 flex-wrap"
                  style={{ border: '1px solid #E9D5FF' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '40px', height: '40px', backgroundColor: '#F3E8FF', color: '#7E22CE' }}
                    >
                      <i className="fas fa-hand-holding-heart fs-5"></i>
                    </div>
                    <div>
                      <strong className="d-block text-dark small">Need Immediate Healing or Pastoral Prayer?</strong>
                      <small className="text-muted">Register your prayer request online or receive prayer in person this Sunday.</small>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setShowLayHandModal(true);
                    }}
                    className="btn btn-sm rounded-pill fw-bold px-3 py-1.5"
                    style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', border: '1px solid #D8B4FE' }}
                  >
                    Fill Form <i className="fas fa-arrow-right ms-1"></i>
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Photo 2 (Layhand Photo) */}
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
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3: SUNDAY FELLOWSHIP FOOD / MEAL SERVICE
          [Layout: Photo on LEFT | Text on RIGHT]
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            {/* Left: Photo 3 (Food Photo) */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/sunday-fellowship-food.jpg"
                    alt="Sunday Fellowship Food Provided Every Sunday - Church of New Generation"
                    className="w-100 h-auto rounded-4"
                    style={{ maxHeight: '440px', objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center gap-2"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.9) 100%)',
                    }}
                  >
                    <i className="fas fa-utensils text-warning fs-5"></i>
                    <div>
                      <small className="fw-bold d-block text-white">Sunday Fellowship Lunch</small>
                      <small className="text-white-50">Served free every Sunday after service (1:15 PM – 2:00 PM)</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Text Content */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: 'bold' }}
                >
                  COMMUNITY & HOSPITALITY
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.1rem' }}>
                  Food Provided Every Sunday
                </h2>

                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7' }}>
                  Every Sunday after the service, we gather around the table as one family to share a <strong>freshly prepared, warm community lunch</strong>.
                </p>

                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Whether you are a newcomer, international student, visitor, or regular church member, you are invited to stay, break bread, and build meaningful friendships.
                </p>

                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 bg-white border border-light shadow-sm d-flex align-items-start gap-2 h-100">
                      <i className="fas fa-utensils text-warning fs-4 mt-1"></i>
                      <div>
                        <strong className="d-block text-dark small">100% Free Meal</strong>
                        <small className="text-muted">Served every week with love</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 bg-white border border-light shadow-sm d-flex align-items-start gap-2 h-100">
                      <i className="fas fa-heart text-danger fs-4 mt-1"></i>
                      <div>
                        <strong className="d-block text-dark small">All Are Welcome</strong>
                        <small className="text-muted">No one sits or eats alone</small>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4: LOCATION & PLAN YOUR VISIT
          [Layout: Text on LEFT | Photo 4 on RIGHT]
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            {/* Left: Location & Details Text */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-right" delay={100}>
                <span
                  className="badge px-3 py-2 rounded-pill mb-3"
                  style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 'bold' }}
                >
                  <i className="fas fa-map-marker-alt me-1"></i> PLAN YOUR SUNDAY VISIT
                </span>
                <h2 className="fw-bold mb-3" style={{ color: '#0F172A', fontSize: '2.1rem' }}>
                  We Look Forward to Seeing You
                </h2>

                <p className="text-muted lead mb-3" style={{ lineHeight: '1.7' }}>
                  Join us this Sunday in Coolaroo, Melbourne for our 10:00 AM – 2:00 PM service.
                </p>

                <div className="p-4 rounded-4 bg-light border mb-4">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <i className="fas fa-map-pin text-danger fs-4 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">Location:</h6>
                      <p className="text-secondary mb-0 small" style={{ lineHeight: '1.5' }}>
                        Progress Community Hall, Unit 27/59 Almurta Ave, Coolaroo VIC 3048, Melbourne, Australia
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <i className="fas fa-clock text-primary fs-4 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">Meeting Time:</h6>
                      <p className="text-secondary mb-0 small">
                        Every Sunday: <strong>10:00 AM – 2:00 PM</strong> (AEST)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  <Link to="/contact" className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm" style={{ backgroundColor: '#4338CA', borderColor: '#3730A3' }}>
                    <i className="fas fa-directions me-2"></i> Get Directions & Contact
                  </Link>
                  <Link to="/prayer-request" className="btn btn-outline-dark fw-bold px-4 py-2 rounded-pill shadow-sm">
                    <i className="fas fa-praying-hands me-2"></i> Send Prayer Request
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Photo 4 (Hall / Fellowship Photo) */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/slide-hall.jpg"
                    alt="Progress Community Hall Coolaroo - Church of New Generation"
                    className="w-100 h-auto rounded-4"
                    style={{ maxHeight: '420px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/about-us.jpg';
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,23,42,0.9) 100%)',
                    }}
                  >
                    <small className="fw-bold d-block text-white">Progress Community Hall • Coolaroo VIC</small>
                    <small className="text-white-50">Free on-site parking • Family & child friendly</small>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LAYING ON OF HANDS PRAYER REQUEST MODAL
          ══════════════════════════════════════════════════════════════ */}
      {showLayHandModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) resetForm();
          }}
        >
          <div
            className="bg-white rounded-4 shadow-2xl overflow-hidden w-100"
            style={{
              maxWidth: '620px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              animation: 'fadeInUp 0.25s ease-out',
            }}
          >
            {/* Modal Header */}
            <div
              className="p-4 text-white position-relative"
              style={{
                background: 'linear-gradient(135deg, #3B0764 0%, #6B21A8 50%, #7E22CE 100%)',
              }}
            >
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-sm btn-light position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px', opacity: 0.9 }}
                aria-label="Close"
              >
                <i className="fas fa-times text-dark"></i>
              </button>

              <div className="d-flex align-items-center gap-2 mb-2">
                <span
                  className="badge px-2.5 py-1 rounded-pill"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FEF08A' }}
                >
                  <i className="fas fa-hands-praying me-1"></i> ANOINTED HEALING PRAYER
                </span>
                <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill small">
                  100% Confidential
                </span>
              </div>

              <h4 className="fw-bold mb-1 text-white">Laying on of Hands Prayer Request</h4>
              <p className="text-white-50 small mb-0">
                “They shall lay hands on the sick, and they shall recover.” — Mark 16:18
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto" style={{ flex: 1 }}>
              {submitted ? (
                <div className="text-center py-4">
                  <div
                    className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '72px',
                      height: '72px',
                      backgroundColor: '#F3E8FF',
                      color: '#7E22CE',
                      fontSize: '32px',
                    }}
                  >
                    <i className="fas fa-check"></i>
                  </div>
                  <h4 className="fw-bold mb-2" style={{ color: '#581C87' }}>
                    Prayer Request Received in Faith!
                  </h4>
                  <p className="text-muted mb-3" style={{ lineHeight: '1.6' }}>
                    Thank you, <strong>{formData.name || 'Believer'}</strong>. Your prayer request for Laying on of Hands has been registered. Pastor <strong>Jaskaran Heer</strong> and our prayer intercessors will hold you before the Lord in faith.
                  </p>

                  <div className="p-3 rounded-3 bg-light border text-start mb-4">
                    <div className="d-flex align-items-start gap-2 mb-2">
                      <i className="fas fa-church text-primary mt-1"></i>
                      <small className="text-dark">
                        <strong>Sunday Service Time:</strong> Every Sunday 10:00 AM – 2:00 PM
                      </small>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <i className="fas fa-map-marker-alt text-danger mt-1"></i>
                      <small className="text-muted">
                        Progress Community Hall, Unit 27/59 Almurta Ave, Coolaroo VIC 3048
                      </small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-primary px-4 py-2 rounded-pill fw-bold"
                      style={{ backgroundColor: '#6B21A8', borderColor: '#581C87' }}
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn btn-outline-secondary px-3 py-2 rounded-pill fw-semibold"
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLayHandSubmit}>
                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark small mb-1">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light text-muted border-end-0">
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-control border-start-0 ps-0"
                          placeholder="Your Full Name"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark small mb-1">
                        Phone / WhatsApp <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light text-muted border-end-0">
                          <i className="fas fa-phone-alt"></i>
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control border-start-0 ps-0"
                          placeholder="e.g. 0412 345 678"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark small mb-1">
                        Email Address <span className="text-muted fw-normal">(Optional)</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light text-muted border-end-0">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-control border-start-0 ps-0"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    {/* Healing Focus Category */}
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark small mb-1">
                        Area of Prayer / Need
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light text-muted border-end-0">
                          <i className="fas fa-heartbeat"></i>
                        </span>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="form-select border-start-0 ps-0"
                        >
                          <option value="health">Physical Healing & Sickness</option>
                          <option value="spiritual">Deliverance & Inner Peace</option>
                          <option value="family">Family & Marriage Restoration</option>
                          <option value="financial">Financial Breakthrough</option>
                          <option value="career">Job & Career Guidance</option>
                          <option value="other">General / Other Urgent Need</option>
                        </select>
                      </div>
                    </div>

                    {/* Attendance Preference */}
                    <div className="col-12">
                      <label className="form-label fw-semibold text-dark small mb-1">
                        How would you like to receive prayer?
                      </label>
                      <div className="row g-2">
                        <div className="col-12 col-sm-6">
                          <label
                            className={`p-2.5 rounded-3 border d-flex align-items-center gap-2 cursor-pointer w-100 h-100 ${
                              formData.attendance === 'in_person'
                                ? 'border-primary bg-primary-subtle text-primary fw-bold'
                                : 'bg-light text-muted'
                            }`}
                            style={{ cursor: 'pointer' }}
                          >
                            <input
                              type="radio"
                              name="attendance"
                              value="in_person"
                              checked={formData.attendance === 'in_person'}
                              onChange={handleInputChange}
                              className="form-check-input mt-0"
                            />
                            <span className="small" style={{ lineHeight: '1.3' }}>
                              In-Person Sunday Service (Coolaroo VIC)
                            </span>
                          </label>
                        </div>
                        <div className="col-12 col-sm-6">
                          <label
                            className={`p-2.5 rounded-3 border d-flex align-items-center gap-2 cursor-pointer w-100 h-100 ${
                              formData.attendance === 'phone_online'
                                ? 'border-primary bg-primary-subtle text-primary fw-bold'
                                : 'bg-light text-muted'
                            }`}
                            style={{ cursor: 'pointer' }}
                          >
                            <input
                              type="radio"
                              name="attendance"
                              value="phone_online"
                              checked={formData.attendance === 'phone_online'}
                              onChange={handleInputChange}
                              className="form-check-input mt-0"
                            />
                            <span className="small" style={{ lineHeight: '1.3' }}>
                              Telephone / Online Prayer Intercession
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Specific Prayer / Healing Request */}
                    <div className="col-12">
                      <label className="form-label fw-semibold text-dark small mb-1">
                        Specific Healing or Prayer Details <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="request_text"
                        value={formData.request_text}
                        onChange={handleInputChange}
                        rows={3}
                        className="form-control"
                        placeholder="Please describe your illness, pain, diagnosis, or what you would like Pastor Jaskaran Heer to lay hands and pray for..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 rounded-3 bg-light border text-muted small d-flex align-items-center gap-2">
                    <i className="fas fa-lock text-success"></i>
                    <span>Your request is kept strictly confidential between you and the pastoral prayer team.</span>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4 d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-outline-secondary px-3 py-2 rounded-pill fw-semibold"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary px-4 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-2"
                      style={{ backgroundColor: '#6B21A8', borderColor: '#581C87' }}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i>
                          <span>Submit Lay Hand Prayer Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
