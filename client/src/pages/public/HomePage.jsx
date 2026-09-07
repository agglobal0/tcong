import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export const HomePage = () => {
  // Hero Slider State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  // Video Modal State
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Hero Slides Data using uploaded church images
  const slides = [
    {
      id: 'slide-1',
      image: '/assets/slide-pastor.jpg',
      badge: "YEAR OF DIVINE ACCELERATION",
      title: "GOD'S PROMISE FOR 2026",
      pastor: 'DR. / PASTOR JASKARAN HEER',
      subtitle: "The Lord shall open unto thee His good treasure and bless all the work of thine hand. Step into a year of divine favor, health & breakthroughs.",
      primaryBtnText: 'CLICK TO WATCH',
      primaryBtnAction: 'watch',
      secondaryBtnText: 'REQUEST PRAYER 24/7',
      secondaryBtnLink: '/prayer-request',
      accentColor: '#B91C1C',
    },
    {
      id: 'slide-2',
      image: '/assets/slide-worship.jpg',
      badge: 'ANOINTED WORSHIP & PRAISE',
      title: "EXPERIENCE GOD'S TANGIBLE GLORY",
      pastor: 'TCONG LIVE WORSHIP & CHOIR',
      subtitle: 'Join us in heartfelt worship, deep spiritual fellowship, and uplifting praise in Hindi, English, and Punjabi every Sunday in Melbourne.',
      primaryBtnText: 'JOIN SUNDAY SERVICE',
      primaryBtnLink: '/services',
      secondaryBtnText: 'EXPLORE MINISTRIES',
      secondaryBtnLink: '/services',
      accentColor: '#7E22CE',
    },
    {
      id: 'slide-3',
      image: '/assets/slide-hall.jpg',
      badge: 'COMMUNITY & FELLOWSHIP',
      title: 'A SPIRITUAL HOME FOR EVERY FAMILY',
      pastor: 'THE CHURCH OF NEW GENERATION',
      subtitle: 'Gather with believers who love, support, and lift one another in prayer. Experience the life-transforming power of the Living Word.',
      primaryBtnText: 'CHURCH SERVICES & TIMINGS',
      primaryBtnLink: '/services',
      secondaryBtnText: 'VISIT COOLAROO VIC',
      secondaryBtnLink: '/contact',
      accentColor: '#059669',
    },
    {
      id: 'slide-4',
      image: '/assets/slide-prayer.jpg',
      badge: '24/7 TELEPHONE PRAYER TOWER',
      title: 'WE ARE PRAYING FOR YOU 24/7',
      pastor: 'CONFIDENTIAL INTERCESSORY PRAYER',
      subtitle: 'No storm is too big for God. Our anointed prayer ministers stand with you in faith for physical healing, family peace, and miracles.',
      primaryBtnText: 'SUBMIT PRAYER REQUEST',
      primaryBtnLink: '/prayer-request',
      secondaryBtnText: 'CALL +61 481 839 109',
      secondaryBtnLink: 'tel:+61481839109',
      accentColor: '#D97706',
    },
  ];

  // Auto-advance hero slides every 5.5 seconds
  useEffect(() => {
    if (isSliderPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isSliderPaused, slides.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  // ═══════ VIDEO DATA (3 Provided Links + 2 Slots for Upcoming User Links) ═══════
  const videoList = [
    {
      id: 'v1',
      youtubeId: 'oISsfRY4pOY',
      title: 'Sunday Anointed Worship',
    },
    {
      id: 'v2',
      youtubeId: 'FZNPtnP6oj4',
      title: "Walking in God's Promises",
    },
    {
      id: 'v3',
      youtubeId: 'ShvdcgBemHU',
      title: 'Miracles of Healing & Prayer',
    },
    {
      id: 'v4',
      youtubeId: 'oISsfRY4pOY', // Slot 4: User Link 4 (Ready to update)
      title: 'Special Anointing Service',
      isSlot: true,
    },
    {
      id: 'v5',
      youtubeId: 'FZNPtnP6oj4', // Slot 5: User Link 5 (Ready to update)
      title: 'The Promise 2026',
      isSlot: true,
    },
  ];

  // Ministries / Blessing Plans
  const blessingPlans = [
    {
      id: 'youth',
      title: 'Youth & NextGen Ministry',
      icon: 'fas fa-users-rays',
      color: '#EC4899',
      bgColor: '#FDF2F8',
      desc: 'Igniting the passion of young people to lead with Christ-like integrity and bold faith.',
      link: '/events',
    },
    {
      id: 'prayer-tower',
      title: '24/7 Telephone Prayer Tower',
      icon: 'fas fa-hands-praying',
      color: '#7E22CE',
      bgColor: '#FAF5FF',
      desc: 'Continuous intercession standing in the gap for people suffering sickness, debt, or despair.',
      link: '/prayer-request',
    },
    {
      id: 'worship',
      title: 'Anointed Worship Ministry',
      icon: 'fas fa-music',
      color: '#2563EB',
      bgColor: '#EFF6FF',
      desc: 'Ushering believers into the heavenly presence of God with spirit-filled music and songs.',
      link: '/services',
    },
    {
      id: 'family',
      title: 'Family & Marriage Blessing',
      icon: 'fas fa-house-chimney-heart',
      color: '#059669',
      bgColor: '#ECFDF5',
      desc: 'Nurturing godly homes, strengthening marriages, and blessing children according to God’s Word.',
      link: '/services',
    },
    {
      id: 'children',
      title: "Children's Sunday School",
      icon: 'fas fa-children',
      color: '#D97706',
      bgColor: '#FFFBEB',
      desc: 'Building foundational biblical knowledge through engaging stories, verses, and creative care.',
      link: '/services',
    },
    {
      id: 'outreach',
      title: 'Community Compassion Outreach',
      icon: 'fas fa-hand-holding-heart',
      color: '#DC2626',
      bgColor: '#FEF2F2',
      desc: 'Extending hands of love through food aid, hospital visits, and benevolence to those in need.',
      link: '/contact',
    },
  ];

  // Testimonials
  const praiseReports = [
    {
      id: 1,
      name: 'Grace R.',
      location: 'Melbourne, Australia',
      title: 'Supernatural Healing from Chronic Pain',
      text: 'After months of severe spinal pain, I requested prayer during Sunday service. Pastor Jaskaran prayed with authority, and I was instantly touched by God’s healing power. I am completely pain-free today!',
      badge: 'Miracle Healing',
    },
    {
      id: 2,
      name: 'Amit & Priya S.',
      location: 'Victoria, Australia',
      title: 'Family Breakthrough & Financial Provision',
      text: 'Our family faced enormous financial stress and immigration uncertainty. Through continuous support and intercession from TCONG Prayer Tower, doors miraculously opened beyond what we imagined!',
      badge: 'Financial Breakthrough',
    },
    {
      id: 3,
      name: 'David K.',
      location: 'Sydney, Australia',
      title: 'Peace Restored in Our Home',
      text: 'The sermons and prayers taught us how to stand firm on God’s Word. Bitterness was replaced with divine love, joy, and peace in our household. All glory to Jesus!',
      badge: 'Family Restoration',
    },
  ];

  // Scroll to video section
  const scrollToVideos = () => {
    const el = document.getElementById('latestVideosSection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page-jesuscalls">
      <Helmet>
        <title>The Church of New Generation Melbourne | Pastor Jaskaran Heer | Hindi Christian Church</title>
        <meta name="description" content="Welcome to The Church of New Generation Melbourne led by Pastor Jaskaran Heer. Watch latest video sermons, request 24/7 prayer, and join our Sunday worship services in Coolaroo VIC." />
        <link rel="canonical" href="https://tcong-murex.vercel.app/" />
        <meta property="og:title" content="The Church of New Generation Melbourne | Pastor Jaskaran Heer" />
        <meta property="og:description" content="Praying for the world. Sunday services, 24/7 Telephone Prayer Tower, live video sermons & miracle testimonies. Coolaroo VIC." />
        <meta property="og:image" content="https://tcong-murex.vercel.app/assets/slide-pastor.jpg" />
      </Helmet>

      {/* ═════════════════════════════════════════════════════════════════════════════
          1. HERO BANNER SLIDER (Exact Jesus Calls Aesthetic with Custom Church Slides)
          ═════════════════════════════════════════════════════════════════════════════ */}
      <section
        className="jc-hero-slider-section position-relative overflow-hidden"
        onMouseEnter={() => setIsSliderPaused(true)}
        onMouseLeave={() => setIsSliderPaused(false)}
        aria-label="Featured Church Announcements Slider"
      >
        <div className="jc-slider-wrapper">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={slide.id}
                className={`jc-slide-item ${isActive ? 'active' : ''}`}
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(8, 12, 28, 0.88) 0%, rgba(15, 23, 42, 0.72) 50%, rgba(15, 23, 42, 0.45) 100%), url("${slide.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              >
                <div className="container jc-slide-container h-100">
                  <div className="row h-100 align-items-center">
                    <div className="col-lg-8 col-xl-7">
                      <div className="jc-slide-content">
                        {/* Top Badge */}
                        <div className="jc-slide-badge-wrapper mb-2 mb-md-3">
                          <span className="jc-slide-badge">
                            <i className="fas fa-sparkles me-2 text-warning"></i>
                            {slide.badge}
                          </span>
                        </div>

                        {/* Slide Main Heading */}
                        <h1 className="jc-slide-title">
                          {slide.title}
                        </h1>

                        {/* Speaker / Pastor Banner */}
                        <div className="jc-pastor-tag mb-3">
                          <span className="jc-pastor-tag-inner">
                            <i className="fas fa-cross me-2 text-danger"></i>
                            {slide.pastor}
                          </span>
                        </div>

                        {/* Subtitle Description */}
                        <p className="jc-slide-desc mb-4">
                          {slide.subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="jc-slide-buttons d-flex flex-wrap align-items-center gap-3">
                          {slide.primaryBtnAction === 'watch' ? (
                            <button
                              type="button"
                              onClick={scrollToVideos}
                              className="jc-btn-watch"
                            >
                              <i className="fas fa-play-circle me-2"></i>
                              {slide.primaryBtnText}
                            </button>
                          ) : (
                            <Link
                              to={slide.primaryBtnLink}
                              className="jc-btn-watch"
                            >
                              <i className="fas fa-arrow-right me-2"></i>
                              {slide.primaryBtnText}
                            </Link>
                          )}

                          {slide.secondaryBtnLink?.startsWith('tel:') ? (
                            <a
                              href={slide.secondaryBtnLink}
                              className="jc-btn-secondary"
                            >
                              <i className="fas fa-phone-alt me-2 text-success"></i>
                              {slide.secondaryBtnText}
                            </a>
                          ) : (
                            <Link
                              to={slide.secondaryBtnLink}
                              className="jc-btn-secondary"
                            >
                              <i className="fas fa-hands-praying me-2 text-warning"></i>
                              {slide.secondaryBtnText}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Side Round Floating Promise Graphic Badge */}
                    <div className="col-lg-4 col-xl-5 d-none d-lg-flex justify-content-center align-items-center">
                      <div className="jc-hero-graphic-circle">
                        <div className="graphic-circle-glow"></div>
                        <div className="graphic-circle-content">
                          <span className="graphic-circle-year">YEAR 2026</span>
                          <span className="graphic-circle-main">GOD'S PROMISE</span>
                          <span className="graphic-circle-sub">FOR YOU & YOUR FAMILY</span>
                          <div className="graphic-circle-cross">✝</div>
                          <span className="graphic-circle-verse">Deut 28:12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══════ SLIDER CONTROLS & DASH/PILL INDICATORS (Jesus Calls Style) ═══════ */}
        <div className="jc-slider-nav-container">
          <button
            type="button"
            className="jc-slider-arrow jc-arrow-prev"
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="jc-slider-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`jc-dash-dot ${idx === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <button
            type="button"
            className="jc-slider-arrow jc-arrow-next"
            onClick={handleNextSlide}
            aria-label="Next Slide"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          2. OUR LATEST VIDEOS SECTION (Exact Jesus Calls 5-Column Row Layout)
          ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="jc-videos-section py-4 py-md-5" id="latestVideosSection">
        <div className="container-fluid px-3 px-md-5">
          {/* Section Header (Jesus Calls Purple Title Style) */}
          <div className="text-center mb-4">
            <ScrollReveal animation="fade-down" delay={0}>
              <h2 className="jc-section-title text-center" style={{ color: '#581C87', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: '800' }}>
                Our Latest Videos
              </h2>
            </ScrollReveal>
          </div>

          {/* Exact Jesus Calls 5-Column Row */}
          <div className="jc-videos-grid-5">
            {videoList.map((vid, idx) => (
              <div
                key={vid.id}
                className="jc-jc-video-item"
                onClick={() => setActiveVideoModal(vid.youtubeId)}
                role="button"
                tabIndex={0}
                aria-label={`Play ${vid.title}`}
              >
                {/* Rounded Video Thumbnail Container */}
                <div className="jc-thumb-container">
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                    alt={vid.title}
                    className="jc-thumb-img"
                    loading="lazy"
                  />
                  {/* Purple Circular Play Button (Jesus Calls Style) */}
                  <div className="jc-circle-play-btn">
                    <i className="fas fa-play ms-1"></i>
                  </div>
                </div>

                {/* Video Title Below Thumbnail */}
                <h3 className="jc-video-item-title">
                  {vid.title}
                </h3>
              </div>
            ))}
          </div>

          {/* View More / YouTube Channel Subscribe Banner */}
          <ScrollReveal animation="fade-up" delay={50}>
            <div className="text-center mt-4 d-flex flex-wrap align-items-center justify-content-center gap-3">
              <a
                href="https://www.youtube.com/@Pastorjaskaranheer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-danger px-4 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
              >
                <i className="fab fa-youtube text-danger fs-5"></i>
                Subscribe on YouTube @Pastorjaskaranheer
              </a>
              <Link
                to="/sermons"
                className="btn btn-purple px-4 py-2 rounded-pill fw-bold text-white shadow-sm"
                style={{ backgroundColor: '#581C87' }}
              >
                <i className="fas fa-list-video me-1"></i> View All Sermons
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          3. BLESSING PLANS & MINISTRIES SECTION (Jesus Calls Style)
          ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="jc-blessing-section py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-2">
          <div className="text-center max-w-2xl mx-auto mb-4 mb-md-5" style={{ maxWidth: '650px' }}>
            <ScrollReveal animation="fade-down" delay={0}>
              <span className="badge px-3 py-2 rounded-pill mb-2 fw-bold" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8' }}>
                BLESSING PLANS & MINISTRIES
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={20}>
              <h2 className="fw-bold mb-2 text-center" style={{ color: '#4A0E4E', fontSize: 'clamp(1.75rem, 3.8vw, 2.3rem)' }}>
                Partnering to Bless Every Family
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={40}>
              <p className="text-muted text-center mb-0" style={{ fontSize: '0.95rem' }}>
                Join hands with The Church of New Generation ministries to touch lives, pray for souls, and spread the Gospel of Jesus Christ.
              </p>
            </ScrollReveal>
          </div>

          <div className="row g-3 g-md-4">
            {blessingPlans.map((plan, idx) => (
              <div className="col-12 col-md-6 col-lg-4" key={plan.id}>
                <ScrollReveal animation="fade-up" delay={idx * 30}>
                  <Link
                    to={plan.link}
                    className="card h-100 border-0 shadow-sm p-4 text-decoration-none jc-ministry-card"
                    style={{ backgroundColor: '#FFFFFF', borderRadius: '16px' }}
                  >
                    <div
                      className="jc-ministry-icon-box mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '14px',
                        backgroundColor: plan.bgColor,
                        color: plan.color,
                        fontSize: '22px',
                      }}
                    >
                      <i className={plan.icon}></i>
                    </div>
                    <h3 className="fw-bold fs-5 mb-2 text-dark">
                      {plan.title}
                    </h3>
                    <p className="text-muted small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>
                      {plan.desc}
                    </p>
                    <div className="d-flex align-items-center text-primary fw-semibold small gap-1">
                      <span>Learn More</span>
                      <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          4. 24/7 TELEPHONE PRAYER TOWER BANNER (Jesus Calls Call Today Box)
          ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-4 py-md-5" style={{ background: 'linear-gradient(135deg, #4A0E4E 0%, #310B35 100%)', color: '#FFFFFF' }}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3">
                <i className="fas fa-phone-volume me-1"></i> 24/7 TELEPHONE PRAYER TOWER
              </span>
              <h2 className="fw-bold text-white mb-3" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}>
                Are You Facing a Difficult Situation? Let Us Pray For You.
              </h2>
              <p className="text-white-50 mb-0" style={{ fontSize: '1rem', lineHeight: '1.7', maxWidth: '720px' }}>
                Our anointed intercessors are available 24 hours a day, 7 days a week to pray over your health, family needs, job situations, and spiritual breakthrough.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-flex flex-column gap-3">
                <a
                  href="tel:+61481839109"
                  className="btn btn-success btn-lg rounded-pill fw-bold px-4 py-3 shadow-lg d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#10B981', border: 'none' }}
                >
                  <i className="fas fa-phone-alt fs-5"></i>
                  Call +61 481 839 109
                </a>
                <Link
                  to="/prayer-request"
                  className="btn btn-outline-light btn-lg rounded-pill fw-semibold px-4 py-2"
                >
                  <i className="fas fa-hands-praying me-2"></i> Submit Online Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          5. PRAISE REPORTS & TESTIMONIES SECTION
          ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-5 bg-white">
        <div className="container py-2">
          <div className="text-center max-w-2xl mx-auto mb-4 mb-md-5" style={{ maxWidth: '650px' }}>
            <ScrollReveal animation="fade-down" delay={0}>
              <span className="badge px-3 py-2 rounded-pill mb-2 fw-bold" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8' }}>
                PRAISE REPORTS & MIRACLES
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={20}>
              <h2 className="fw-bold mb-2 text-center" style={{ color: '#4A0E4E', fontSize: 'clamp(1.75rem, 3.8vw, 2.3rem)' }}>
                Testimonies of God's Faithfulness
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={40}>
              <p className="text-muted text-center mb-0" style={{ fontSize: '0.95rem' }}>
                Read how prayer and faith in Jesus Christ are changing lives, healing sicknesses, and restoring families.
              </p>
            </ScrollReveal>
          </div>

          <div className="row g-3 g-md-4">
            {praiseReports.map((t) => (
              <div className="col-12 col-md-4" key={t.id}>
                <ScrollReveal animation="fade-up" delay={t.id * 40}>
                  <div
                    className="card h-100 border-0 shadow-sm p-4 d-flex flex-column justify-content-between"
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#FAF5FF',
                      borderLeft: '4px solid #7E22CE',
                    }}
                  >
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-white text-purple shadow-sm px-3 py-1 rounded-pill" style={{ color: '#6B21A8', border: '1px solid #E9D5FF' }}>
                          {t.badge}
                        </span>
                        <i className="fas fa-quote-right fs-4 text-warning opacity-75"></i>
                      </div>
                      <h4 className="fw-bold fs-6 mb-2" style={{ color: '#1E293B' }}>
                        {t.title}
                      </h4>
                      <p className="text-secondary small mb-4" style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
                        "{t.text}"
                      </p>
                    </div>
                    <div className="pt-3 border-top d-flex align-items-center gap-3" style={{ borderColor: '#E9D5FF' }}>
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: '42px', height: '42px', backgroundColor: '#7E22CE', fontSize: '15px' }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">{t.name}</h6>
                        <small className="text-muted">{t.location}</small>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <div className="text-center pt-4 mt-2">
            <Link to="/testimonials" className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold">
              View All Praise Reports &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          6. SUNDAY SERVICE & MELBOURNE LOCATION
          ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-5" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="container">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="row g-0">
              <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center">
                <span className="badge bg-purple text-white px-3 py-2 rounded-pill mb-3 align-self-start" style={{ backgroundColor: '#7E22CE' }}>
                  JOIN OUR CHURCH SERVICES
                </span>
                <h3 className="fw-bold mb-3" style={{ color: '#1E293B', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  Worship With Us in Coolaroo, Melbourne
                </h3>
                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Whether you are seeking prayer, fellowship, or a deeper walk with Jesus Christ, we warmly invite you and your family to our Sunday and midweek services.
                </p>

                <div className="d-flex flex-column gap-3 mb-4">
                  <div className="d-flex align-items-start gap-3">
                    <div className="rounded-circle p-2 bg-purple-subtle text-purple d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: '#F3E8FF', color: '#6B21A8' }}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <strong className="d-block text-dark">Sunday Worship Service</strong>
                      <span className="text-muted small">Every Sunday @ 10:30 AM (Hindi, English & Punjabi)</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="rounded-circle p-2 bg-purple-subtle text-purple d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: '#F3E8FF', color: '#6B21A8' }}>
                      <i className="fas fa-location-dot"></i>
                    </div>
                    <div>
                      <strong className="d-block text-dark">Church Location</strong>
                      <span className="text-muted small">Unit 27/59 Almurta Ave, Coolaroo VIC 3048, Melbourne, Australia</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 flex-wrap">
                  <Link to="/contact" className="btn btn-primary rounded-pill px-4 py-2 fw-bold">
                    Get Directions & Details
                  </Link>
                  <a href="tel:+61481839109" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold">
                    <i className="fas fa-phone-alt me-1"></i> Contact Pastor
                  </a>
                </div>
              </div>

              <div className="col-lg-6">
                <img
                  src="/assets/slide-hall.jpg"
                  alt="The Church of New Generation Gathering in Melbourne"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          7. EMBEDDED VIDEO MODAL PLAYER
          ═════════════════════════════════════════════════════════════════════════════ */}
      {activeVideoModal && (
        <div
          className="jc-video-modal-backdrop"
          onClick={() => setActiveVideoModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="jc-video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="jc-modal-close-btn"
              onClick={() => setActiveVideoModal(null)}
              aria-label="Close video player"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="jc-video-iframe-responsive">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1&rel=0&modestbranding=1`}
                title="Sermon Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
