import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const FloatingWidgets = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-widgets-container" id="floatingWidgets">
      {/* Scroll to Top Button - Appears only when scrolled */}
      <button
        onClick={scrollToTop}
        className={`floating-scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      {/* Expanded Quick Action Menu Overlay / Speed Dial Items */}
      <div className={`floating-actions-menu ${isExpanded ? 'open' : ''}`}>
        {/* Telephone Action */}
        <a
          href="tel:+919876543210"
          className="floating-action-item call-action"
          onClick={() => setIsExpanded(false)}
          title="Call 24/7 Prayer Tower"
        >
          <div className="action-icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <div className="action-text">
            <span className="action-title">Call 24/7 Prayer Tower</span>
            <span className="action-sub">+91 98765 43210</span>
          </div>
        </a>

        {/* Prayer Request Action */}
        <Link
          to="/prayer-request"
          className="floating-action-item prayer-action"
          onClick={() => setIsExpanded(false)}
          title="Submit Prayer Request"
        >
          <div className="action-icon">
            <i className="fas fa-hands-praying"></i>
          </div>
          <div className="action-text">
            <span className="action-title">Request Prayer 24/7</span>
            <span className="action-sub">Confidential Intercession</span>
          </div>
        </Link>
      </div>

      {/* Main Floating Trigger Button (Speed Dial) */}
      <button
        type="button"
        className={`floating-main-trigger ${isExpanded ? 'active' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Toggle Quick Prayer & Call Actions"
        title={isExpanded ? 'Close Quick Menu' : 'Prayer & Help'}
      >
        <span className="trigger-icon-closed">
          <i className="fas fa-hands-praying"></i>
        </span>
        <span className="trigger-icon-open">
          <i className="fas fa-times"></i>
        </span>
        <span className="trigger-label d-none d-sm-inline-block">
          {isExpanded ? 'Close' : 'Prayer 24/7'}
        </span>
        {!isExpanded && <span className="trigger-pulse"></span>}
      </button>

      {/* Backdrop for mobile to easily close menu when tapped outside */}
      {isExpanded && (
        <div
          className="floating-backdrop"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};
