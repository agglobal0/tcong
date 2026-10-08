import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useSettings } from '../../context/SettingsContext';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { TextSequence } from '../../components/common/TextSequence';


export const ContactPage = () => {
  const { addToast } = useToast();
  const { settings } = useSettings();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.public.submitContact(formData);
      if (res.success) {
        addToast('Thank you for contacting us! We will reply shortly.', 'success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        addToast(res.message || 'Failed to send message', 'error');
      }
    } catch (err) {
      addToast(err.message || 'Error submitting message', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact TCONG Melbourne | Visit The Church of New Generation | Coolaroo VIC 3048</title>
        <meta name="description" content="Contact The Church of New Generation Melbourne. Visit us at Coolaroo VIC 3048 for Sunday services. Reach Pastor Jaskaran Heer's team for pastoral care & inquiries." />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/contact" />
        <meta property="og:title" content="Contact TCONG Melbourne | The Church of New Generation" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/contact" />
        <meta property="og:image" content="https://www.churchofnewgeneration.com/assets/contact-hall.jpg" />
      </Helmet>
      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-4">
          <TextSequence
            text="Contact Us - We'd Love to Hear From You"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-white-50 max-w-xl mx-auto mb-3" style={{ maxWidth: '650px' }}>
              We would love to connect with you! Reach out for prayer, service inquiries, or pastoral care in Melbourne.
            </p>
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <i className="fas fa-location-dot text-warning"></i>
              <span className="fw-semibold text-white small">Coolaroo VIC 3048, Melbourne • 24/7 Telephone Prayer Tower</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ CHURCH HALL PHOTO & LOCATION SHOWCASE ═══════ */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center mb-5">
            {/* Church Hall Gathering Photo */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/contact-hall.jpg"
                    alt="Pastor Jaskaran Heer & Church Congregation"
                    className="w-100 h-auto rounded-4"
                    style={{ objectFit: 'cover', maxHeight: '440px' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center gap-2"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                    }}
                  >
                    <i className="fas fa-church text-warning fs-5"></i>
                    <div>
                      <small className="fw-bold d-block text-white">Pastor Jaskaran Heer & Congregation</small>
                      <small className="text-white-50">Warmly welcoming families to every service</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Details */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={200}>
                <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}>
                  LOCATION & CONNECT
                </span>
                <h2 className="fw-bold mb-4" style={{ color: '#581C87', fontSize: '2.4rem' }}>
                  Visit Us & Connect With Our Family
                </h2>

                <div className="d-flex flex-column gap-4">
                  <div className="d-flex align-items-start gap-3 p-3 rounded-4 bg-light">
                    <i className="fas fa-map-marker-alt text-primary fs-3 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A' }}>Church Location</h6>
                      <p className="text-muted mb-0 small">{settings.address || 'Progress Community Hall, Unit 27/59 Almurta Ave, Coolaroo VIC 3048'}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 p-3 rounded-4 bg-light">
                    <i className="fas fa-phone-alt text-success fs-3 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A' }}>Phone & 24/7 Prayer Line</h6>
                      <p className="text-muted mb-0 small">{settings.phone || '+61 481 839 109'}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 p-3 rounded-4 bg-light">
                    <i className="fas fa-envelope text-danger fs-3 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: '#0F172A' }}>Email Address</h6>
                      <p className="text-muted mb-0 small">{settings.email || 'info@tcong.org'}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* ═══════ CONTACT FORM ═══════ */}
          <div className="py-4 mx-auto" style={{ maxWidth: '800px' }}>
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                <h3 className="fw-bold mb-2 text-center" style={{ color: '#581C87' }}>Send Us a Message</h3>
                <p className="text-muted text-center mb-4 small">Have a question or request? Fill out the form below and we will respond promptly.</p>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+61 481 839 109"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="General Inquiry / Pastoral Visit"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="How can we serve or assist you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-lg w-100 fw-semibold rounded-pill text-white shadow-sm" style={{ backgroundColor: '#7E22CE', border: 'none' }} disabled={loading}>
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

