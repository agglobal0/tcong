import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ministriesDropdown, setMinistriesDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMinistriesDropdown(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Blessing Plans', path: '/services', isDropdown: true },
    { label: 'Services', path: '/services' },
    { label: 'Youth Ministry', path: '/events' },
    { label: 'Sermons', path: '/sermons' },
    { label: 'Blogs', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'Prayer Towers', path: '/prayer-request' },
  ];

  const ministriesList = [
    { name: 'Worship & Music Ministry', path: '/services#worship', icon: 'fas fa-music' },
    { name: '24/7 Prayer Tower & Intercession', path: '/prayer-request', icon: 'fas fa-hands-praying' },
    { name: 'Youth & NextGen Fellowship', path: '/events', icon: 'fas fa-users' },
    { name: "Children's Sunday School", path: '/services#children', icon: 'fas fa-child' },
    { name: "Family & Women's Blessing", path: '/services#women', icon: 'fas fa-heart' },
    { name: 'Community Outreach & Care', path: '/contact', icon: 'fas fa-hand-holding-heart' },
  ];

  return (
    <>
      {/* ═══════ TOP ANNOUNCEMENT & PRAYER BAR ═══════ */}
      <div className="site-topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span className="topbar-tagline">
              <i className="fas fa-globe-asia me-2 text-warning"></i>
              <strong>PRAYING FOR THE WORLD</strong>
              <span className="topbar-divider">|</span>
              CALL TODAY - <a href="tel:+61481839109" className="topbar-phone"><i className="fas fa-phone-alt me-1 text-success"></i> +61 481 839 109</a>
            </span>
          </div>

          <div className="topbar-right">
            <span className="topbar-motto d-none d-md-inline">
              JOIN HANDS IN BUILDING GOD'S KINGDOM
            </span>
            <Link to="/prayer-request" className="topbar-prayer-btn" id="topbarPrayerBtn">
              <i className="fas fa-hands-praying me-1"></i>
              Prayer 24/7
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN SITE HEADER ═══════ */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo" id="headerLogo">
            <div className="header-logo-icon">✝</div>
            <div className="header-logo-text">
              <span className="brand-main">THE CHURCH OF NEW GENERATION</span>
              <span className="brand-sub">PRAYING FOR THE WORLD • MELBOURNE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav" id="headerNav">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
              Home
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>

            {/* Blessing Plans / Ministries Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setMinistriesDropdown(true)}
              onMouseLeave={() => setMinistriesDropdown(false)}
            >
              <button
                type="button"
                className={`nav-dropdown-btn ${ministriesDropdown ? 'open' : ''}`}
                onClick={() => setMinistriesDropdown(!ministriesDropdown)}
              >
                Blessing Plans <i className="fas fa-chevron-down ms-1 dropdown-chevron"></i>
              </button>

              <div className={`nav-dropdown-menu ${ministriesDropdown ? 'show' : ''}`}>
                <div className="dropdown-menu-header">
                  <span className="dropdown-header-title">Church Ministries & Plans</span>
                  <small className="text-muted">Partner in God's Work</small>
                </div>
                {ministriesList.map((m, idx) => (
                  <Link
                    key={idx}
                    to={m.path}
                    className="dropdown-menu-item"
                    onClick={() => setMinistriesDropdown(false)}
                  >
                    <i className={`${m.icon} dropdown-item-icon`}></i>
                    <span className="dropdown-item-text">{m.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
              Services
            </NavLink>

            <NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>
              Youth Ministry
            </NavLink>

            <NavLink to="/sermons" className={({ isActive }) => (isActive ? 'active' : '')}>
              Sermons
            </NavLink>

            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
              Blogs
            </NavLink>

            <NavLink to="/prayer-request" className={({ isActive }) => (isActive ? 'active' : '')}>
              Prayer Towers
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>

            {/* Language Selector */}
            <div className="nav-language-badge" title="Language: English / Hindi / Punjabi">
              <i className="fas fa-globe me-1"></i> English <i className="fas fa-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
            </div>
          </nav>

          {/* Header Action Button */}
          <div className="header-cta">
            <Link to="/prayer-request" className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">
              <i className="fas fa-hands-praying me-1"></i> Prayer
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ═══════ MOBILE DRAWER MENU ═══════ */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileMenuOpen(false);
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <span className="fw-bold text-dark fs-5">Menu</span>
            <button
              className="btn-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            ></button>
          </div>

          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-home me-2 text-purple"></i> Home
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-church me-2 text-purple"></i> About
          </Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-calendar-check me-2 text-purple"></i> Blessing Plans & Services
          </Link>
          <Link to="/events" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-users me-2 text-purple"></i> Youth Ministry & Programs
          </Link>
          <Link to="/sermons" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-video me-2 text-purple"></i> Sermons & Latest Videos
          </Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-book-open me-2 text-purple"></i> Blogs & Articles
          </Link>
          <Link to="/prayer-request" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-hands-praying me-2 text-purple"></i> 24/7 Prayer Towers
          </Link>
          <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-heart me-2 text-purple"></i> Praise Reports & Testimonies
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-envelope me-2 text-purple"></i> Contact Us
          </Link>

          <div className="pt-3 border-top mt-3 d-flex flex-column gap-2">
            <a
              href="tel:+61481839109"
              className="btn btn-outline-dark w-100 rounded-pill py-2 text-center"
            >
              <i className="fas fa-phone-alt me-2 text-success"></i> Call Prayer Line
            </a>
            <Link
              to="/prayer-request"
              className="btn btn-primary w-100 rounded-pill py-2 text-center fw-bold shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fas fa-hands-praying me-2"></i> Request Prayer 24/7
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
