import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="site-footer" id="siteFooter">
      <div className="footer-grid">
        <div className="footer-about">
          <div className="footer-logo">
            <div className="footer-logo-icon">✝</div>
            <div className="footer-logo-text">{settings.church_name || 'The Church of New Generation'}</div>
          </div>
          <p className="footer-description">
            {settings.church_description || 'A vibrant community of believers committed to growing in faith, serving with love, and making a difference in the world. Everyone is welcome.'}
          </p>
          <div className="footer-social">
            {settings.facebook_url && (
              <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {settings.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {settings.youtube_url && (
              <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            )}
            {settings.twitter_url && (
              <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-x-twitter"></i>
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/events">Events</Link>
            <Link to="/sermons">Sermons</Link>
            <Link to="/blog">Blog</Link>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Get Involved</h4>
          <div className="footer-links">
            <Link to="/prayer-request">Prayer Request</Link>
            <Link to="/testimonials">Testimonials</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Contact Info</h4>
          <div className="footer-contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{settings.address || '123 Faith Street, New Delhi, India 110001'}</span>
          </div>
          <div className="footer-contact-item">
            <i className="fas fa-phone"></i>
            <span>{settings.phone || '+91 98765 43210'}</span>
          </div>
          <div className="footer-contact-item">
            <i className="fas fa-envelope"></i>
            <span>{settings.email || 'info@tcong.org'}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>&copy; {new Date().getFullYear()} {settings.church_name || 'The Church of New Generation'}. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
