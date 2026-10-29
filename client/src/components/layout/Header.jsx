import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <>
      {/* ═══════ MAIN SITE HEADER ═══════ */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo" id="headerLogo">
            <div className="header-logo-icon p-0 overflow-hidden" style={{ background: 'transparent', boxShadow: 'none' }}>
              <img src="/favicon.svg" alt="TCONG Logo" style={{ width: '100%', height: '100%', borderRadius: '10px', boxShadow: '0 4px 10px rgba(126, 34, 206, 0.25)' }} />
            </div>
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

            <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
              Services
            </NavLink>

            <NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>
              Events
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
            <div className="d-flex align-items-center gap-2">
              <img src="/favicon.svg" alt="TCONG Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
              <span className="fw-bold text-dark fs-6">Menu</span>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center border-0 shadow-none"
              style={{ width: '36px', height: '36px' }}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <i className="fas fa-times text-secondary fs-5"></i>
            </button>
          </div>

          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)} end>
            <i className="fas fa-home text-purple"></i> Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-church text-purple"></i> About
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-calendar-check text-purple"></i> Services & Ministries
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-calendar-alt text-purple"></i> Events
          </NavLink>
          <NavLink to="/sermons" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-video text-purple"></i> Sermons & Latest Videos
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-book-open text-purple"></i> Blogs & Articles
          </NavLink>
          <NavLink to="/prayer-request" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-hands-praying text-purple"></i> 24/7 Prayer Towers
          </NavLink>
          <NavLink to="/testimonials" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-heart text-purple"></i> Praise Reports & Testimonies
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-envelope text-purple"></i> Contact Us
          </NavLink>

          <div className="pt-3 border-top mt-auto d-flex flex-column gap-2">
            <a
              href="tel:+61481839109"
              className="btn btn-outline-dark w-100 rounded-pill py-2 text-center fw-semibold"
            >
              <i className="fas fa-phone-alt me-2 text-success"></i> Call Prayer Line
            </a>
            <NavLink
              to="/prayer-request"
              className="btn btn-primary w-100 rounded-pill py-2 text-center fw-bold shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fas fa-hands-praying me-2"></i> Request Prayer 24/7
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
