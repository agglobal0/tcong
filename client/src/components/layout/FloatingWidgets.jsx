import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const FloatingWidgets = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

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
    <div className="bottom-corner-widgets" id="bottomCornerWidgets">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="widget-scrolltop-btn"
          aria-label="Scroll to top"
          title="Back to Top"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      )}

      {/* Floating Action Menu (Call & Prayer + Close Button) */}
      {isOpen ? (
        <div className="bottom-corner-card">
          <button
            type="button"
            className="corner-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close quick actions"
            title="Close"
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="corner-actions-row">
            {/* Call Action */}
            <a
              href="tel:+61481839109"
              className="corner-action-item call-action"
              title="Call 24/7 Prayer Tower (+61 481 839 109)"
            >
              <div className="corner-icon-circle dark-circle">
                <i className="fas fa-phone-alt"></i>
              </div>
              <span className="corner-label">Call</span>
            </a>

            {/* Pray Action */}
            <Link
              to="/prayer-request"
              className="corner-action-item prayer-action"
              title="Submit Prayer Request 24/7"
            >
              <div className="corner-icon-circle purple-circle">
                <i className="fas fa-hands-praying"></i>
              </div>
              <span className="corner-label">Pray</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Minimized Trigger Button */
        <button
          type="button"
          className="bottom-corner-reopen-btn"
          onClick={() => setIsOpen(true)}
          title="Open Prayer & Call Actions"
          aria-label="Open Prayer & Call Actions"
        >
          <i className="fas fa-hands-praying me-1"></i>
          <span>Prayer & Call</span>
          <span className="reopen-pulse"></span>
        </button>
      )}
    </div>
  );
};
