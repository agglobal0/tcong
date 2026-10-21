import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();

  const facebookLink = (!settings.facebook_url || settings.facebook_url === 'https://facebook.com' || settings.facebook_url === 'https://facebook.com/tcong')
    ? 'https://www.facebook.com/Pastorjaskaranheer'
    : settings.facebook_url;

  const twitterLink = (!settings.twitter_url || settings.twitter_url === 'https://twitter.com' || settings.twitter_url === 'https://twitter.com/tcong')
    ? 'https://x.com/Jaskaranhee5'
    : settings.twitter_url;

  const youtubeLink = (!settings.youtube_url || settings.youtube_url === 'https://youtube.com' || settings.youtube_url === 'https://youtube.com/@tcong')
    ? 'https://www.youtube.com/@Pastorjaskaranheer'
    : settings.youtube_url;

  const instagramLink = (!settings.instagram_url || settings.instagram_url === 'https://instagram.com' || settings.instagram_url === 'https://instagram.com/tcong' || settings.instagram_url === 'https://instagram.com/thechurchofnewgeneration')
    ? 'https://www.instagram.com/pastorjaskaranheer?vrfl=MWsxcTkzZHF3d3h5ZA=='
    : settings.instagram_url;

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
            <a href={facebookLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href={youtubeLink} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            <a href={twitterLink} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <i className="fab fa-x-twitter"></i>
            </a>
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
            <a
              href="https://maps.google.com/?q=Progress+Community+Hall+Unit+27/59+Almurta+Ave+Coolaroo+VIC+3048"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {settings.address || 'Progress Community Hall, Unit 27/59 Almurta Ave, Coolaroo VIC 3048'}
            </a>
          </div>
          <div className="footer-contact-item">
            <i className="fas fa-phone"></i>
            <a
              href={`tel:${(settings.phone || '+61481839109').replace(/[\s\-\(\)]/g, '')}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {settings.phone || '+61 481 839 109'}
            </a>
          </div>
          <div className="footer-contact-item">
            <i className="fas fa-envelope"></i>
            <a
              href={`mailto:${settings.email || 'info@tcong.org'}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {settings.email || 'info@tcong.org'}
            </a>
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
