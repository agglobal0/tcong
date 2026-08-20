import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { TextSequence } from '../../components/common/TextSequence';
import { StaggerSequence } from '../../components/common/StaggerSequence';

export const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Exact real YouTube video IDs provided by user
  const realVideos = [
    {
      id: 'v1',
      youtubeId: 'oISsfRY4pOY',
      title: 'Pastor Jaskaran Heer Sermon 1',
      embedUrl: 'https://www.youtube.com/embed/oISsfRY4pOY',
    },
    {
      id: 'v2',
      youtubeId: 'FZNPtnP6oj4',
      title: 'Pastor Jaskaran Heer Sermon 2',
      embedUrl: 'https://www.youtube.com/embed/FZNPtnP6oj4',
    },
    {
      id: 'v3',
      youtubeId: 'ShvdcgBemHU',
      title: 'Pastor Jaskaran Heer Sermon 3',
      embedUrl: 'https://www.youtube.com/embed/ShvdcgBemHU',
    },
  ];

  // Duplicated array for seamless continuous right-to-left automatic animation
  const marqueeRealVideos = [...realVideos, ...realVideos, ...realVideos];

  // Ministries
  const ministries = [
    {
      id: 'worship',
      name: 'Worship Ministry',
      icon: 'fas fa-music',
      desc: 'Leading the congregation into intimate worship, praise, and powerful presence of God through music & choir.',
      color: '#8B5CF6',
    },
    {
      id: 'youth',
      name: 'Youth Ministry',
      icon: 'fas fa-users',
      desc: 'Empowering young people to stand strong in faith, build Christ-centered friendships, and lead with purpose.',
      color: '#EC4899',
    },
    {
      id: 'prayer',
      name: 'Prayer Ministry',
      icon: 'fas fa-praying-hands',
      desc: 'Dedicated intercessors standing in prayer 24/7 for healing, family breakthroughs, and nation revival.',
      color: '#3B82F6',
    },
    {
      id: 'children',
      name: "Children's Ministry",
      icon: 'fas fa-child',
      desc: "Nurturing the next generation in God's Word with engaging activities, Bible lessons, and love.",
      color: '#10B981',
    },
    {
      id: 'outreach',
      name: 'Outreach Ministry',
      icon: 'fas fa-hand-holding-heart',
      desc: 'Serving local communities with food drives, medical relief, clothing distribution, and practical love.',
      color: '#F59E0B',
    },
    {
      id: 'women',
      name: "Women's Ministry",
      icon: 'fas fa-female',
      desc: 'Building strong, faith-filled women through fellowship, prayer circles, and inspirational Bible study.',
      color: '#6366F1',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Grace R.',
      location: 'Chennai',
      category: 'Miracle Healing',
      text: 'I called the 24/7 Telephone Prayer Tower when doctors gave up hope. The prayer intercessor prayed with power, and the Lord completely healed me!',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 2,
      name: 'David K.',
      location: 'New Delhi',
      category: 'Job Provision',
      text: 'After 8 months of unemployment, I claimed the Monthly Promise verse. Within 2 weeks, I received an amazing job offer beyond my expectations!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 3,
      name: 'Priya & Family',
      location: 'Mumbai',
      category: 'Family Restoration',
      text: 'Our family was torn apart by misunderstanding. Through continuous prayer support from TCONG, God restored love, peace, and unity in our home.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="home-page">
      {/* ═══════ HERO BANNER WITH NATURAL CHURCH PHOTO (NO HEAVY PURPLE SHADE) ═══════ */}
      <section
        className="hero-section text-center text-white py-5 position-relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.65) 100%), url("/assets/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
          <ScrollReveal animation="fade-down" delay={0}>
            <span
              className="badge px-4 py-2 rounded-pill mb-3 border shadow-sm"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                fontSize: '0.92rem',
                letterSpacing: '1px',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              WELCOME TO TCONG MINISTRIES — PASTOR JASKARAN HEER
            </span>
          </ScrollReveal>
          
          <TextSequence
            text="Transforming Lives Through Anointed Word & Prayer"
            as="h1"
            className="display-3 fw-extrabold mb-4 text-white"
            style={{
              textShadow: '0 3px 14px rgba(0, 0, 0, 0.9)',
              letterSpacing: '-0.5px',
            }}
            delay={0}
            wordDelay={20}
          />


          <ScrollReveal animation="fade-up" delay={0}>
            <p
              className="lead max-w-2xl mx-auto mb-5 text-white fw-medium"
              style={{
                maxWidth: '750px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                fontSize: '1.25rem',
              }}
            >
              Join Pastor Jaskaran Heer & The Church of New Generation. Watch latest sermon broadcasts, request prayer 24/7, and receive God's promise.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" delay={0}>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link
                to="/prayer-request"
                className="btn btn-lg px-4 py-3 shadow-lg fw-bold rounded-pill"
                style={{
                  backgroundColor: '#A855F7',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 8px 20px rgba(168, 85, 247, 0.5)',
                }}
              >
                Request Prayer 24/7
              </Link>
              <a
                href="https://www.youtube.com/@Pastorjaskaranheer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold rounded-pill d-flex align-items-center gap-2"
                style={{
                  backdropFilter: 'blur(6px)',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  borderWidth: '2px',
                }}
              >
                <i className="fab fa-youtube text-danger fs-4"></i> Subscribe @Pastorjaskaranheer
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ VIDEO GALLERY — CONTINUOUS RIGHT-TO-LEFT AUTOMATIC SLIDING ANIMATION ═══════ */}
      <section className="py-5 bg-white position-relative overflow-hidden">
        <div className="container-fluid px-4 py-3">
          <ScrollReveal animation="fade-up" delay={0}>
            <h2
              className="text-center fw-bold mb-4"
              style={{
                color: '#B91C1C',
                fontStyle: 'italic',
                fontSize: '2.5rem',
                fontFamily: 'serif, sans-serif',
              }}
            >
              Video Gallery
            </h2>
          </ScrollReveal>

          {/* Continuous Automatic Right-to-Left Sliding Track */}
          <div
            className="overflow-hidden position-relative py-3 px-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ width: '100%' }}
          >
            <div
              className="d-flex gap-4"
              style={{
                width: 'max-content',
                animation: 'rightToLeftMarquee 26s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
                willChange: 'transform',
              }}
            >
              {marqueeRealVideos.map((vid, idx) => (
                <div
                  key={`${vid.id}_${idx}`}
                  style={{
                    width: '360px',
                    height: '225px',
                    flexShrink: 0,
                  }}
                >
                  <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 position-relative">
                    <iframe
                      src={`${vid.embedUrl}?rel=0&modestbranding=1`}
                      title={vid.title}
                      className="w-100 h-100"
                      style={{ border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View More Red Outline Button */}
          <ScrollReveal animation="fade-up" delay={0}>
            <div className="text-center mt-4">
              <a
                href="https://www.youtube.com/@Pastorjaskaranheer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn px-4 py-2 fw-semibold rounded-3"
                style={{
                  borderColor: '#B91C1C',
                  color: '#B91C1C',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  backgroundColor: 'transparent',
                  fontSize: '0.95rem',
                }}
              >
                View More
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right-to-Left Keyframe Animation */}
        <style>{`
          @keyframes rightToLeftMarquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-33.3333%, 0, 0);
            }
          }
        `}</style>
      </section>

      {/* ═══════ OUR MINISTRIES SECTION ═══════ */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="text-center max-w-2xl mx-auto mb-5" style={{ maxWidth: '650px' }}>
            <ScrollReveal animation="fade-down" delay={0}>
              <span className="badge px-3 py-2 rounded-pill mb-2" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}>
                OUR MINISTRIES
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={30}>
              <h2 className="fw-bold mb-2 text-center" style={{ color: '#581C87', fontSize: '2.2rem' }}>
                Serving God & Building Community
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={50}>
              <p className="text-muted text-center mb-0">
                Explore our vibrant ministry arms designed to nurture faith, serve families, and impact lives.
              </p>
            </ScrollReveal>
          </div>

          {/* Featured Worship Ministry Spotlight Photo */}
          <ScrollReveal animation="zoom-in" delay={50}>
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5" style={{ backgroundColor: '#FAF5FF' }}>
              <div className="row g-0 align-items-center">
                <div className="col-lg-6">
                  <div className="position-relative overflow-hidden img-reveal-wrapper" style={{ minHeight: '340px' }}>
                    <img
                      src="/assets/worship-ministry.jpg"
                      alt="Worship Choir & Band Ministry"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', minHeight: '340px' }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center gap-2"
                      style={{
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                      }}
                    >
                      <i className="fas fa-music text-warning fs-5"></i>
                      <div>
                        <small className="fw-bold d-block text-white">Worship & Music Ministry</small>
                        <small className="text-white-50">Anointed singers, musicians & choir leading praise</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 p-4 p-md-5">
                  <span className="badge bg-purple text-white px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: '#7E22CE' }}>
                    FEATURED SPOTLIGHT
                  </span>
                  <h3 className="fw-bold mb-3" style={{ color: '#581C87' }}>Anointed Praise & Music Ministry</h3>
                  <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                    Our worship team brings together passionate vocalists, guitarists, keyboardists, and intercessors dedicated to ushering the congregation into a powerful atmosphere of God's presence and glory every week.
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-white text-purple shadow-sm px-3 py-2 rounded-pill" style={{ color: '#6B21A8', border: '1px solid #E9D5FF' }}>
                      <i className="fas fa-microphone me-1"></i> Live Vocal Choir
                    </span>
                    <span className="badge bg-white text-purple shadow-sm px-3 py-2 rounded-pill" style={{ color: '#6B21A8', border: '1px solid #E9D5FF' }}>
                      <i className="fas fa-guitar me-1"></i> Band & Instruments
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <StaggerSequence as="div" className="row g-4 mb-4" initialDelay={50} staggerDelay={40} animation="fade-up">
            {ministries.map((m) => (
              <div className="col-md-6 col-lg-4" key={m.id}>
                <div
                  className="card border-0 shadow-sm h-100 rounded-4 p-4 text-start"
                  style={{
                    backgroundColor: '#FAF5FF',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(88, 28, 135, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                >
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: m.color,
                      color: '#FFFFFF',
                      fontSize: '24px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    <i className={m.icon}></i>
                  </div>
                  <h4 className="fw-bold mb-2" style={{ color: '#1E293B' }}>{m.name}</h4>
                  <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </StaggerSequence>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS & PRAISE REPORTS SECTION ═══════ */}
      <section className="py-5" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container py-3">
          <div className="text-center max-w-2xl mx-auto mb-5" style={{ maxWidth: '650px' }}>
            <ScrollReveal animation="fade-down" delay={0}>
              <span className="badge px-3 py-2 rounded-pill mb-2" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}>
                PRAISE REPORTS & MIRACLES
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={30}>
              <h2 className="fw-bold mb-2 text-center" style={{ color: '#581C87', fontSize: '2.2rem' }}>
                Testimonies of God's Greatness
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={50}>
              <p className="text-muted text-center mb-0">
                Read how prayer and faith are transforming lives, bringing physical healing, financial provision, and family breakthroughs.
              </p>
            </ScrollReveal>
          </div>

          {/* Featured Testimony Family Photo Showcase */}
          <ScrollReveal animation="zoom-in" delay={50}>
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="row g-0 align-items-center">
                <div className="col-lg-6">
                  <div className="position-relative overflow-hidden img-reveal-wrapper" style={{ minHeight: '340px' }}>
                    <img
                      src="/assets/testimony-family.jpg"
                      alt="Families Experiencing Miracles in Church Service"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', minHeight: '340px' }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center gap-2"
                      style={{
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                      }}
                    >
                      <i className="fas fa-heart text-warning fs-5"></i>
                      <div>
                        <small className="fw-bold d-block text-white">Families Listening To Praise Reports</small>
                        <small className="text-white-50">Experiencing God's healing touch & peace</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 p-4 p-md-5">
                  <span className="badge bg-purple text-white px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: '#7E22CE' }}>
                    FAITH & MIRACLES
                  </span>
                  <h3 className="fw-bold mb-3" style={{ color: '#581C87' }}>Real Stories of Healing & Hope</h3>
                  <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                    Every week, men, women, and families witness divine intervention — from sicknesses cured to restored relationships and financial breakthroughs through intercessory prayer.
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-light text-purple shadow-sm px-3 py-2 rounded-pill" style={{ color: '#6B21A8', border: '1px solid #E9D5FF' }}>
                      <i className="fas fa-pray me-1"></i> Intercessory Prayer
                    </span>
                    <span className="badge bg-light text-purple shadow-sm px-3 py-2 rounded-pill" style={{ color: '#6B21A8', border: '1px solid #E9D5FF' }}>
                      <i className="fas fa-star me-1"></i> Divine Healing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <StaggerSequence as="div" className="row g-4 mb-4" initialDelay={50} staggerDelay={40} animation="zoom-in">
            {testimonials.map((t) => (
              <div className="col-md-4" key={t.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 d-flex flex-column justify-content-between" style={{ backgroundColor: '#FFFFFF', borderLeft: '4px solid #7E22CE' }}>
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="text-warning fs-3">
                        <i className="fas fa-quote-left" style={{ color: '#A855F7' }}></i>
                      </div>
                      <span className="badge bg-white text-purple shadow-sm px-3 py-1 rounded-pill" style={{ color: '#6B21A8', border: '1px solid #E9D5FF' }}>
                        {t.category}
                      </span>
                    </div>
                    <p className="text-secondary mb-4" style={{ fontStyle: 'italic', fontSize: '0.98rem', lineHeight: '1.6' }}>
                      "{t.text}"
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{ borderColor: '#E9D5FF' }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0" style={{ color: '#1E293B' }}>{t.name}</h6>
                      <small className="text-muted">{t.location}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerSequence>

          <ScrollReveal animation="fade-up" delay={80}>
            <div className="text-center pt-3">
              <Link to="/testimonials" className="btn btn-outline-primary btn-lg px-4 rounded-pill fw-bold" style={{ borderColor: '#581C87', color: '#581C87' }}>
                View All Testimonies &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};


