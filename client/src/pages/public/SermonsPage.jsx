import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../services/api';
import { TextSequence } from '../../components/common/TextSequence';
import { ScrollReveal } from '../../components/common/ScrollReveal';

// Default curated sermons featuring Pastor Jaskaran Heer in serial date-wise order
const DEFAULT_SERMONS = [
  {
    id: 1,
    title: 'Special Anointing Service & Breakthrough',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Sunday Worship',
    date: '2026-03-08',
    youtubeId: 'G8MzgsAzK3s',
    description: 'Entering a new dimension of spiritual authority, purpose, and blessing in Christ.',
  },
  {
    id: 2,
    title: 'The Promise 2026 - Prophetic Message',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Prophetic',
    date: '2026-03-01',
    youtubeId: 'kyU3dD54vqA',
    description: 'Prophetic insights and biblical direction for stepping into God’s abundant blessings this year.',
  },
  {
    id: 3,
    title: 'Sunday Anointed Worship Service',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Sunday Worship',
    date: '2026-02-22',
    youtubeId: 'oISsfRY4pOY',
    description: 'Experience deep anointed worship and powerful life-changing preaching in the presence of God.',
  },
  {
    id: 4,
    title: "Walking in God's Promises & Faith",
    speaker: 'Pastor Jaskaran Heer',
    category: 'Healing & Faith',
    date: '2026-02-15',
    youtubeId: 'FZNPtnP6oj4',
    description: 'Learn how to stand firm on God’s eternal promises in times of uncertainty and trial.',
  },
  {
    id: 5,
    title: 'Miracles of Healing & Deliverance Prayer',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Prayer & Deliverance',
    date: '2026-02-08',
    youtubeId: 'ShvdcgBemHU',
    description: 'A powerful prayer session releasing divine health, healing, and freedom for your family.',
  },
  {
    id: 6,
    title: 'Building a Strong Christian Family & Marriage',
    speaker: 'Pastor Jaskaran Heer',
    category: 'Youth & Family',
    date: '2026-02-01',
    youtubeId: 'oISsfRY4pOY',
    description: 'Biblical wisdom for nurturing godly homes, honoring marriage, and raising blessed children.',
  },
];

const CURATED_YOUTUBE_IDS = ['G8MzgsAzK3s', 'kyU3dD54vqA', 'oISsfRY4pOY', 'FZNPtnP6oj4', 'ShvdcgBemHU'];

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const SermonsPage = () => {
  const [sermons, setSermons] = useState(DEFAULT_SERMONS);
  const [loading, setLoading] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.public
      .getSermons()
      .then((res) => {
        const list = res.data || [];
        if (list && list.length > 0) {
          // Normalize API data to include youtubeId, speaker, and serial date sorting
          const formatted = list.map((item, index) => {
            let yId = item.video_id || '';
            if (!yId && item.youtube_url) {
              yId = item.youtube_url.includes('v=')
                ? item.youtube_url.split('v=')[1].split('&')[0]
                : item.youtube_url.split('/').pop();
            }
            if (!yId) {
              yId = CURATED_YOUTUBE_IDS[index % CURATED_YOUTUBE_IDS.length];
            }

            const speakerName =
              !item.speaker || item.speaker.trim().toLowerCase() === 'pastor name' || item.speaker.trim().toLowerCase() === 'pastor'
                ? 'Pastor Jaskaran Heer'
                : item.speaker;

            const dateValue = item.sermon_date || item.created_at || DEFAULT_SERMONS[index % DEFAULT_SERMONS.length].date;

            return {
              id: item.id || index + 1,
              title: item.title,
              speaker: speakerName,
              category: item.category_name || item.category || 'Sunday Sermons',
              date: dateValue,
              youtubeId: yId,
              description: item.description,
            };
          });

          // Sort date-wise in descending (serial/chronological) order
          formatted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

  return (
    <div className="sermons-page">
      <Helmet>
        <title>Pastor Jaskaran Heer Sermons Online | Hindi Christian Preaching | TCONG Melbourne</title>
        <meta
          name="description"
          content="Watch Pastor Jaskaran Heer's anointed Hindi & English sermons online. Healing, faith, prayer & deliverance messages from TCONG Melbourne."
        />
        <link rel="canonical" href="https://www.churchofnewgeneration.com/sermons" />
        <meta property="og:title" content="Pastor Jaskaran Heer Sermons | TCONG Melbourne" />
        <meta property="og:url" content="https://www.churchofnewgeneration.com/sermons" />
        <meta property="og:image" content="https://www.churchofnewgeneration.com/assets/services.jpg" />
      </Helmet>

      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="bg-primary text-white py-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' }}
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
            <p className="lead text-white-50 max-w-xl mx-auto mb-3" style={{ maxWidth: '720px' }}>
              Watch, listen, and grow in faith with anointed messages and miracle teachings by Pastor Jaskaran Heer.
            </p>
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <i className="fas fa-play-circle text-warning"></i>
              <span className="fw-semibold text-white small">Anointed Video Sermons • Hindi & English Preaching • Pastor Jaskaran Heer</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ SERMONS CONTENT SECTION ═══════ */}
      <section className="py-5 bg-light" style={{ minHeight: '600px' }}>
        <div className="container py-2">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-purple" style={{ color: '#7E22CE' }} role="status"></div>
            </div>
          ) : (
            <div className="row g-4">
              {sermons.map((s, idx) => (
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
                        <div className="d-flex align-items-center justify-content-between mb-1.5 flex-wrap gap-1">
                          <span
                            className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                            style={{ backgroundColor: '#F3E8FF', color: '#6B21A8' }}
                          >
                            {s.category || 'Sunday Sermons'}
                          </span>
                          {s.date && (
                            <span className="small text-muted fw-semibold d-inline-flex align-items-center">
                              <i className="far fa-calendar-alt me-1 text-purple" style={{ color: '#7E22CE' }}></i>
                              {formatDate(s.date)}
                            </span>
                          )}
                        </div>
                        <h3 className="jc-video-item-title mb-1" style={{ fontSize: '1.02rem', lineHeight: '1.4' }}>
                          {s.title}
                        </h3>
                        <small className="text-muted d-block mb-1">
                          <i className="fas fa-user-tie me-1 text-purple" style={{ color: '#7E22CE' }}></i>
                          {s.speaker || 'Pastor Jaskaran Heer'}
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

