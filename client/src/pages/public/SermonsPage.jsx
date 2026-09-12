import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';

// Default curated sermons featuring Pastor Jaskaran Heer
const DEFAULT_SERMONS = [
  {
    id: 1,
    title: 'Sunday Anointed Worship Service',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Sunday Worship',
    youtubeId: 'oISsfRY4pOY',
    description: 'Experience deep anointed worship and powerful life-changing preaching in the presence of God.',
  },
  {
    id: 2,
    title: "Walking in God's Promises & Faith",
    speaker: 'Pastor Jaskaran Heer',
    category: 'Healing & Faith',
    youtubeId: 'FZNPtnP6oj4',
    description: 'Learn how to stand firm on God’s eternal promises in times of uncertainty and trial.',
  },
  {
    id: 3,
    title: 'Miracles of Healing & Deliverance Prayer',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Prayer & Deliverance',
    youtubeId: 'ShvdcgBemHU',
    description: 'A powerful prayer session releasing divine health, healing, and freedom for your family.',
  },
  {
    id: 4,
    title: 'Special Anointing Service & Breakthrough',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Sunday Worship',
    youtubeId: 'G8MzgsAzK3s',
    description: 'Entering a new dimension of spiritual authority, purpose, and blessing in Christ.',
  },
  {
    id: 5,
    title: 'The Promise 2026 - Prophetic Message',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Prophetic',
    youtubeId: 'kyU3dD54vqA',
    description: 'Prophetic insights and biblical direction for stepping into God’s abundant blessings this year.',
  },
  {
    id: 6,
    title: 'Building a Strong Christian Family & Marriage',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Youth & Family',
    youtubeId: 'oISsfRY4pOY',
    description: 'Biblical wisdom for nurturing godly homes, honoring marriage, and raising blessed children.',
  },
];

const CATEGORIES = ['All', 'Sunday Worship', 'Healing & Faith', 'Prayer & Deliverance', 'Youth & Family', 'Prophetic'];

export const SermonsPage = () => {
  const [sermons, setSermons] = useState(DEFAULT_SERMONS);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.public
      .getSermons()
      .then((res) => {
        const list = res.data || [];
        if (list && list.length > 0) {
          // Normalize API data to include youtubeId
          const formatted = list.map((item, index) => {
            let yId = item.video_id || '';
            if (!yId && item.youtube_url) {
              yId = item.youtube_url.includes('v=')
                ? item.youtube_url.split('v=')[1].split('&')[0]
                : item.youtube_url.split('/').pop();
            }
            return {
              id: item.id || index + 1,
              title: item.title,
              speaker: item.speaker || 'Pastor Jaskaran Heer',
              category: item.category || 'Sunday Worship',
              youtubeId: yId || DEFAULT_SERMONS[index % DEFAULT_SERMONS.length].youtubeId,
              description: item.description,
            };
          });
          setSermons(formatted);
        } else {
          setSermons(DEFAULT_SERMONS);
        }
      })
      .catch(() => {
        setSermons(DEFAULT_SERMONS);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredSermons =
    activeCategory === 'All'
      ? sermons
      : sermons.filter((s) => s.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="sermons-page">
      <Helmet>
        <title>Pastor Jaskaran Heer Sermons Online | Hindi Christian Preaching | TCONG Melbourne</title>
        <meta
          name="description"
          content="Watch Pastor Jaskaran Heer's anointed Hindi & English sermons online. Healing, faith, prayer & deliverance messages from TCONG Melbourne."
        />
        <link rel="canonical" href="https://tcong-murex.vercel.app/sermons" />
        <meta property="og:title" content="Pastor Jaskaran Heer Sermons | TCONG Melbourne" />
        <meta property="og:url" content="https://tcong-murex.vercel.app/sermons" />
      </Helmet>

      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-dark text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4A0E4E 100%)' }}
      >
        <div className="container py-4">
          <TextSequence
            text="Sermons - Watch & Listen Online"
            as="h1"
            className="display-4 fw-bold mb-3 text-white"
            delay={100}
            wordDelay={80}
          />
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="lead text-light opacity-90 mx-auto" style={{ maxWidth: '650px' }}>
              Watch, listen, and grow in faith with anointed messages and miracle teachings by Pastor Jaskaran Heer.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ SERMONS CONTENT SECTION ═══════ */}
      <section className="py-5 bg-light" style={{ minHeight: '600px' }}>
        <div className="container py-2">
          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn rounded-pill px-3 py-2 fw-semibold ${
                  activeCategory === cat
                    ? 'btn-purple text-white shadow-sm'
                    : 'btn-white bg-white text-dark border'
                }`}
                style={
                  activeCategory === cat
                    ? { backgroundColor: '#581C87', borderColor: '#581C87' }
                    : { borderColor: '#E2E8F0' }
                }
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-purple" style={{ color: '#7E22CE' }} role="status"></div>
            </div>
          ) : (
            <div className="row g-4">
              {filteredSermons.map((s, idx) => (
                <div className="col-12 col-sm-6 col-lg-4" key={s.id || idx}>
                  <ScrollReveal animation="fade-up" delay={(idx % 6) * 60}>
                    <div
                      className="jc-jc-video-item h-100"
                      onClick={() => setActiveVideoModal(s.youtubeId)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Play ${s.title}`}
                    >
                      {/* Rounded Video Thumbnail with Central Play Button */}
                      <div className="jc-thumb-container">
                        <img
                          src={`https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`}
                          alt={s.title}
                          className="jc-thumb-img"
                          loading="lazy"
                        />
                        <div className="jc-circle-play-btn">
                          <i className="fas fa-play ms-1"></i>
                        </div>
                      </div>

                      {/* Video Title & Meta Below Thumbnail */}
                      <div className="pt-2">
                        <span
                          className="badge rounded-pill mb-1 px-2 py-1 small fw-semibold"
                          style={{ backgroundColor: '#F3E8FF', color: '#6B21A8' }}
                        >
                          {s.category || 'Sunday Worship'}
                        </span>
                        <h3 className="jc-video-item-title mb-1" style={{ fontSize: '1.02rem', lineHeight: '1.4' }}>
                          {s.title}
                        </h3>
                        <small className="text-muted d-block">
                          <i className="fas fa-user-tie me-1 text-purple" style={{ color: '#7E22CE' }}></i>
                          {s.speaker}
                        </small>
                        {s.description && (
                          <p className="text-secondary small mt-1 mb-0" style={{ lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {s.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          )}

          {/* YouTube Subscribe Call-to-Action Box */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div
              className="card border-0 shadow-sm rounded-4 p-4 p-md-5 text-center mt-5"
              style={{ background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)', border: '1px solid #E9D5FF' }}
            >
              <div className="max-w-xl mx-auto" style={{ maxWidth: '650px' }}>
                <i className="fab fa-youtube text-danger display-4 mb-3"></i>
                <h3 className="fw-bold mb-2" style={{ color: '#4A0E4E' }}>
                  Never Miss a Live Sermon or Anointed Message
                </h3>
                <p className="text-muted mb-4">
                  Subscribe to Pastor Jaskaran Heer’s official YouTube channel for live Sunday streams, mid-week prayer services, and powerful miracle testimonies.
                </p>
                <a
                  href="https://www.youtube.com/@Pastorjaskaranheer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger btn-lg rounded-pill px-4 py-2 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
                >
                  <i className="fab fa-youtube fs-5"></i> Subscribe @Pastorjaskaranheer
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ EMBEDDED VIDEO MODAL PLAYER ═══════ */}
      {activeVideoModal && (
        <div
          className="jc-video-modal-backdrop"
          onClick={() => setActiveVideoModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="jc-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="jc-modal-close-btn"
              onClick={() => setActiveVideoModal(null)}
              aria-label="Close video player"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="jc-video-iframe-responsive">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1&rel=0&modestbranding=1`}
                title="Sermon Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

