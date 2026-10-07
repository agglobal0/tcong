import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';


const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    author_name: 'Grace R.',
    title: 'Melbourne, Australia',
    badge: 'Miracle Healing',
    content: 'After months of severe spinal pain, I requested prayer during Sunday service. Pastor Jaskaran prayed with authority, and I was instantly touched by God’s healing power. I am completely pain-free today!',
  },
  {
    id: 2,
    author_name: 'Bro. Himanshu & Family',
    title: 'Victoria, Australia',
    badge: 'Car Blessing & Provision',
    photo: '/assets/testimony-car-blessing.jpg',
    content: 'The Church of New Generation की प्रार्थना ग्रहण करने से भाई हिमांशु को मिली नई कार की आशीष। God answered our prayers through Pastor Jaskaran Heer with divine favor and a brand new car. All glory to Jesus Christ!',
  },
  {
    id: 3,
    author_name: 'Amit & Priya S.',
    title: 'Victoria, Australia',
    badge: 'Financial Breakthrough',
    content: 'Our family faced enormous financial stress and immigration uncertainty. Through continuous support and intercession from TCONG Prayer Tower, doors miraculously opened beyond what we imagined!',
  },
];

export const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public
      .getTestimonials()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      })
      .catch(() => setTestimonials(DEFAULT_TESTIMONIALS))
      .finally(() => setLoading(false));
  }, []);

  const displayList = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <div className="testimonials-page">
      <Helmet>
        <title>Miracle Healing Testimonies | TCONG Melbourne | Pastor Jaskaran Heer Prayer Stories</title>
        <meta name="description" content="Read real miracle testimonies from TCONG Melbourne — healings, family restorations, financial breakthroughs & answered prayers through Pastor Jaskaran Heer's intercession." />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/testimonials" />
        <meta property="og:title" content="Miracle Testimonies | The Church of New Generation Melbourne" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/testimonials" />
      </Helmet>
      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-4">
          <h1 className="display-4 fw-bold mb-3 text-white">Testimonies - God's Power & Miracles</h1>
          <p className="lead text-white-50 max-w-xl mx-auto mb-3" style={{ maxWidth: '680px' }}>
            Hear how God is healing, blessing, and transforming lives through prayer and faith in Jesus Christ.
          </p>
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <i className="fas fa-heart text-warning"></i>
            <span className="fw-semibold text-white small">Miracle Healings • Family Restoration • Answered Prayers</span>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div className="row g-4">
              {displayList.map((t) => (
                <div className="col-md-6 col-lg-4" key={t.id}>
                  <div
                    className="card h-100 border-0 shadow-sm rounded-4 p-4 d-flex flex-column justify-content-between"
                    style={{ backgroundColor: '#FAF5FF', borderLeft: '4px solid #7E22CE' }}
                  >
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-white text-purple shadow-sm px-3 py-1 rounded-pill" style={{ color: '#6B21A8', border: '1px solid #E9D5FF' }}>
                          {t.badge || 'Praise Report'}
                        </span>
                        <i className="fas fa-quote-right fs-4 text-warning opacity-75"></i>
                      </div>
                      <p className="text-secondary small mb-4" style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
                        "{t.content || t.testimonial_text}"
                      </p>
                    </div>
                    <div className="pt-3 border-top d-flex align-items-center gap-3" style={{ borderColor: '#E9D5FF' }}>
                      {t.photo ? (
                        <img
                          src={t.photo}
                          alt={t.author_name || t.name}
                          className="rounded-circle object-fit-cover shadow-sm"
                          style={{ width: '46px', height: '46px', border: '2px solid #7E22CE', flexShrink: 0 }}
                        />
                      ) : (
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                          style={{ width: '44px', height: '44px', backgroundColor: '#7E22CE', fontSize: '15px' }}
                        >
                          {(t.author_name || t.name || 'M').charAt(0)}
                        </div>
                      )}
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">{t.author_name || t.name}</h6>
                        <small className="text-muted">{t.title || t.location || 'Church Member'}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
