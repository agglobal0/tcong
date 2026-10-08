import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { TextSequence } from '../../components/common/TextSequence';


export const PrayerRequestPage = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'other',
    request_text: '',
    is_anonymous: false,
    is_private: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.request_text.trim()) {
      addToast('Please enter your prayer request', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.public.submitPrayerRequest(formData);
      if (res.success) {
        setSubmitted(true);
        addToast('Your prayer request has been received. Our prayer team will stand with you!', 'success');
      } else {
        addToast(res.message || 'Failed to submit prayer request', 'error');
      }
    } catch (err) {
      addToast(err.message || 'Failed to submit request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="prayer-request-page">
      <Helmet>
        <title>Submit a Prayer Request 24/7 | Online Prayer Tower | TCONG Melbourne</title>
        <meta name="description" content="Submit your confidential prayer request online 24/7. TCONG Melbourne's intercessory prayer team, led by Pastor Jaskaran Heer, stands in faith for your healing & breakthrough." />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/prayer-request" />
        <meta property="og:title" content="24/7 Prayer Request | The Church of New Generation Melbourne" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/prayer-request" />
        <meta property="og:image" content="https://www.churchofnewgeneration.com/assets/pastor-prayer.jpg" />
      </Helmet>
      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-4">
          <TextSequence
            text="Prayer Request - We're Here for You 24/7"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-white-50 max-w-xl mx-auto mb-3" style={{ maxWidth: '680px' }}>
              “Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.” — Philippians 4:6
            </p>
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <i className="fas fa-hands-praying text-warning"></i>
              <span className="fw-semibold text-white small">24/7 Prayer Tower • Confidential • Pastor Jaskaran Heer & Intercessors</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ PASTOR PRAYER SHOWCASE ═══════ */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center mb-5">
            {/* Pastor Prayer Image */}
            <div className="col-lg-6">
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-light img-reveal-wrapper">
                  <img
                    src="/assets/pastor-prayer.jpg"
                    alt="Pastor Jaskaran Heer Leading Intercessory Prayer"
                    className="w-100 h-auto rounded-4"
                    style={{ objectFit: 'cover', maxHeight: '450px' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center gap-2"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                    }}
                  >
                    <i className="fas fa-praying-hands text-warning fs-4"></i>
                    <div>
                      <small className="fw-bold d-block text-white">Pastor Jaskaran Heer & Prayer Team</small>
                      <small className="text-white-50">Lifting up requests 24/7 for breakthroughs & healing</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Prayer Information */}
            <div className="col-lg-6">
              <ScrollReveal animation="fade-left" delay={200}>
                <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 'bold' }}>
                  24/7 PRAYER SUPPORT
                </span>
                <h2 className="fw-bold mb-4" style={{ color: '#581C87', fontSize: '2.4rem' }}>
                  Standing In Powerful Faith With You
                </h2>
                <p className="text-muted lead mb-3">
                  No burden is too heavy, and no request is too small for our Lord. Our intercessors stand in continuous prayer for your family.
                </p>
                <div className="d-flex flex-column gap-3 mt-4">
                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light">
                    <i className="fas fa-phone-alt text-purple fs-4 mt-1" style={{ color: '#7E22CE' }}></i>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: '#1E293B' }}>Telephone Prayer Tower</h6>
                      <small className="text-muted">Speak directly with an anointed prayer warrior for instant prayer.</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light">
                    <i className="fas fa-user-shield text-purple fs-4 mt-1" style={{ color: '#7E22CE' }}></i>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: '#1E293B' }}>Strict Confidentiality</h6>
                      <small className="text-muted">Your prayer request is handled with sacred trust and privacy.</small>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* ═══════ PRAYER FORM ═══════ */}
          <div className="py-4 mx-auto" style={{ maxWidth: '750px' }}>
            {submitted ? (
              <ScrollReveal animation="zoom-in">
                <div className="card border-0 shadow-lg p-5 text-center rounded-4">
                  <div className="text-success display-1 mb-3"><i className="fas fa-check-circle"></i></div>
                  <h2 className="fw-bold mb-2">We Are Praying With You!</h2>
                  <p className="text-muted mb-4">
                    Thank you for reaching out. Pastor Jaskaran Heer & our dedicated intercessory team have received your request and are standing in faith with you.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline-primary mx-auto rounded-pill px-4 fw-semibold">
                    Submit Another Request
                  </button>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal animation="fade-up" delay={150}>
                <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                  <h3 className="fw-bold mb-2 text-center" style={{ color: '#581C87' }}>Submit Your Prayer Request</h3>
                  <p className="text-muted text-center mb-4 small">Fill out the form below to share your request with our prayer team.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Category</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="other">General Prayer</option>
                        <option value="health">Healing & Health</option>
                        <option value="family">Family & Relationships</option>
                        <option value="financial">Financial & Job Provision</option>
                        <option value="spiritual">Spiritual Growth & Guidance</option>
                        <option value="career">Career & Education</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="anonCheck"
                          checked={formData.is_anonymous}
                          onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
                        />
                        <label className="form-check-label fw-semibold" htmlFor="anonCheck">
                          Submit Anonymously
                        </label>
                      </div>
                    </div>

                    {!formData.is_anonymous && (
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Your Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                          />
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Your Prayer Request</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Please share what you would like us to pray for..."
                        value={formData.request_text}
                        onChange={(e) => setFormData({ ...formData, request_text: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-lg w-100 fw-semibold rounded-pill text-white shadow-sm" style={{ backgroundColor: '#7E22CE', border: 'none' }} disabled={submitting}>
                      {submitting ? 'Submitting Request...' : 'Send Prayer Request'}
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

