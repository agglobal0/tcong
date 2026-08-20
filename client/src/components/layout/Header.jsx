import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Events', path: '/events' },
    { label: 'Sermons', path: '/sermons' },
    { label: 'Blog', path: '/blog' },
    { label: 'Prayer', path: '/prayer-request' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
        <div className="header-inner">
          <Link to="/" className="header-logo" id="headerLogo">
            <div className="header-logo-icon">✝</div>
            <div className="header-logo-text">
              The Church of<br />
              <small>New Generation</small>
            </div>
          </Link>

          <nav className="header-nav" id="headerNav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-cta">
            <Link to="/contact" className="btn btn-primary btn-sm">
              Join Us
            </Link>
          </div>

          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)}>
            Testimonials
          </Link>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            onClick={() => setMobileMenuOpen(false)}
            style={{ marginTop: '1rem' }}
          >
            Join Us
          </Link>
        </div>
      </div>
    </>
  );
};

