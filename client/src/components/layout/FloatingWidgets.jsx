import React from 'react';
import { Link } from 'react-router-dom';

export const FloatingWidgets = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '80px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {/* Call Action */}
      <a
        href="tel:+919876543210"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: '#1E293B',
            border: '2px solid #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <i className="fas fa-phone-alt"></i>
        </div>
        <span style={{ fontSize: '11px', color: '#1E293B', fontWeight: 'bold', marginTop: '4px' }}>Call</span>
      </a>

      {/* Pray Action */}
      <Link
        to="/prayer-request"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: '#1E293B',
            border: '2px solid #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <i className="fas fa-hands"></i>
        </div>
        <span style={{ fontSize: '11px', color: '#1E293B', fontWeight: 'bold', marginTop: '4px' }}>Pray</span>
      </Link>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#6B7280',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          marginTop: '8px',
        }}
        aria-label="Scroll to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </div>
  );
};
