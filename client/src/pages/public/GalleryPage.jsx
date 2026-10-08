import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { StaggerSequence } from '../../components/common/StaggerSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';

const DEFAULT_GALLERY = [
  { id: 'g1', title: 'Worship Choir & Music Ministry', image_url: '/assets/worship-ministry.jpg', category: 'Worship' },
  { id: 'g2', title: 'Pastor Jaskaran Heer Intercessory Prayer', image_url: '/assets/pastor-prayer.jpg', category: 'Prayer' },
  { id: 'g3', title: 'Church Congregation & Families', image_url: '/assets/about-us.jpg', category: 'Community' },
  { id: 'g4', title: 'Live Praise & Anointed Stage Ministry', image_url: '/assets/services.jpg', category: 'Service' },
  { id: 'g5', title: 'Worship Hall Gathering & Message', image_url: '/assets/contact-hall.jpg', category: 'Fellowship' },
  { id: 'g6', title: 'Testimony & Miracle Moments', image_url: '/assets/testimony-family.jpg', category: 'Miracles' },
];

export const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    api.public
      .getGallery()
      .then((res) => {
        const data = res.data || [];
        setGallery(data.length > 0 ? data : DEFAULT_GALLERY);
      })
      .catch(() => setGallery(DEFAULT_GALLERY))
      .finally(() => setLoading(false));
  }, []);

  const displayList = gallery.length > 0 ? gallery : DEFAULT_GALLERY;

  return (
    <div className="gallery-page">
      <Helmet>
        <title>Photo Gallery & Church Moments | The Church of New Generation Melbourne</title>
        <meta name="description" content="View photos of worship, Sunday service, prayer ministry, and community fellowship at The Church of New Generation Melbourne with Pastor Jaskaran Heer." />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/gallery" />
        <meta property="og:title" content="Photo Gallery & Church Moments | TCONG Melbourne" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/gallery" />
        <meta property="og:image" content="https://www.churchofnewgeneration.com/assets/worship-ministry.jpg" />
      </Helmet>
      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
      >
        <div className="container py-4">
          <TextSequence
            text="Photo Gallery & Moments of Grace"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={90}
          />
          <ScrollReveal animation="fade-up" delay={400}>
            <p className="lead text-white-50 max-w-xl mx-auto mb-3" style={{ maxWidth: '650px' }}>
              Moments of worship, fellowship, prayer, and ministry in action at The Church of New Generation.
            </p>
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <i className="fas fa-images text-warning"></i>
              <span className="fw-semibold text-white small">Church Life • Sunday Gatherings • Fellowship Moments</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div>
              <StaggerSequence
                as="div"
                className="row g-4"
                staggerDelay={140}
                animation="zoom-in"
              >
                {displayList.map((item, idx) => (
                  <div className="col-md-4 col-sm-6" key={item.id || idx}>
                    <div
                      className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 img-reveal-wrapper position-relative cursor-pointer"
                      onClick={() => setActiveImage(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={item.image_url || item.url}
                        alt={item.title || 'Church Media'}
                        className="card-img-top"
                        style={{ height: '280px', objectFit: 'cover' }}
                      />
                      <div
                        className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center justify-content-between"
                        style={{
                          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
                        }}
                      >
                        <div>
                          <small className="badge bg-purple text-white mb-1" style={{ backgroundColor: '#7E22CE' }}>
                            {item.category || 'Church Life'}
                          </small>
                          <h6 className="fw-bold mb-0 text-white" style={{ fontSize: '0.95rem' }}>{item.title}</h6>
                        </div>
                        <i className="fas fa-expand-alt text-white fs-5 opacity-75"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerSequence>
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1060 }}
          onClick={() => setActiveImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 bg-transparent text-white">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-white">{activeImage.title}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setActiveImage(null)}
                ></button>
              </div>
              <div className="modal-body text-center p-3">
                <img
                  src={activeImage.image_url || activeImage.url}
                  alt={activeImage.title}
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: '80vh', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


