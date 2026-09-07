import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const FloatingWidgets = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 260);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="jesuscalls-floating-dock" id="jesuscallsFloatingDock">
      {/* 1. Donate Floating Button (Green) */}
      <Link
        to="/contact#donate"
        className="dock-item dock-donate"
        title="Donate Now — Build God's Kingdom"
        id="floatingDonateBtn"
      >
        <div className="dock-icon-circle dock-circle-green">
          <i className="fas fa-hand-holding-dollar"></i>
        </div>
        <span className="dock-label">Donate</span>
      </Link>

      {/* 2. Call 24/7 Telephone Prayer Tower (Dark/Black) */}
      <a
        href="tel:+61481839109"
        className="dock-item dock-call"
        title="Call 24/7 Telephone Prayer Tower (+61 481 839 109)"
        id="floatingCallBtn"
      >
        <div className="dock-icon-circle dock-circle-dark">
          <i className="fas fa-phone-alt"></i>
        </div>
        <span className="dock-label">Call</span>
      </a>

      {/* 3. Pray / Prayer Request (White with icon) */}
      <Link
        to="/prayer-request"
        className="dock-item dock-pray"
        title="Submit Confidential Prayer Request 24/7"
        id="floatingPrayBtn"
      >
        <div className="dock-icon-circle dock-circle-white">
          <i className="fas fa-hands-praying"></i>
        </div>
        <span className="dock-label">Pray</span>
      </Link>

      {/* 4. Scroll to Top Button (Subtle circular button) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="dock-item dock-scrolltop"
          aria-label="Scroll to top"
          title="Back to Top"
        >
          <div className="dock-icon-circle dock-circle-scroll">
            <i className="fas fa-chevron-up"></i>
          </div>
        </button>
      )}
    </div>
  );
};
