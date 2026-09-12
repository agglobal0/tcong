import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useSettings } from '../../context/SettingsContext';

const getYouTubeId = (urlOrId) => {
  if (!urlOrId) return '';
  const str = String(urlOrId).trim();
  if (str.length === 11 && !str.includes('/') && !str.includes('?')) return str;
  if (str.includes('embed/')) {
    return str.split('embed/')[1].split('?')[0].split('&')[0];
  }
  if (str.includes('v=')) {
    return str.split('v=')[1].split('&')[0].split('?')[0];
  }
  if (str.includes('youtu.be/')) {
    return str.split('youtu.be/')[1].split('?')[0].split('&')[0];
  }
  return str;
};

export const AdminSettingsPage = () => {
  const { addToast } = useToast();
  const { reloadSettings } = useSettings();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    church_name: 'The Church of New Generation',
    church_tagline: 'A Community of Faith, Hope, and Love',
    pastor_name: 'Pastor Jaskaran Heer',
    church_description: 'A vibrant community of believers committed to growing in faith, serving with love, and making a difference in the world.',
    phone: '+61 481 839 109',
    prayer_phone: '+61 481 839 109',
    email: 'info@tcong.org',
    address: 'Progress Community Hall, Unit 27/59 Almurta Ave, Coolaroo VIC 3048',
    maps_embed_url: '',
    facebook_url: 'https://facebook.com',
    instagram_url: 'https://instagram.com/thechurchofnewgeneration',
    youtube_url: 'https://www.youtube.com/@Pastorjaskaranheer',
    twitter_url: 'https://twitter.com',
    hero_heading: "Experience God's Love in Community",
    hero_subheading: 'Join us every Sunday as we worship, learn, and grow together. Everyone is welcome at The Church of New Generation.',
    bible_verse: 'For where two or three gather in my name, there am I with them.',
    bible_verse_reference: 'Matthew 18:20',
    meta_title: 'The Church of New Generation Melbourne | Pastor Jaskaran Heer | Hindi Christian Church',
    meta_description: "Join Pastor Jaskaran Heer at The Church of New Generation, Melbourne's Hindi, English & Punjabi Christian church in Coolaroo VIC.",
    featured_video_1: 'oISsfRY4pOY',
    featured_video_2: 'FZNPtnP6oj4',
    featured_video_3: 'ShvdcgBemHU',
    featured_video_4: 'G8MzgsAzK3s',
    featured_video_5: 'kyU3dD54vqA',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = () => {
    setLoading(true);
    api.admin
      .getSettings()
      .then((res) => {
        if (res && res.data) {
          let dataObj = {};
          if (Array.isArray(res.data)) {
            res.data.forEach((item) => {
              if (item.setting_key && !item.setting_key.match(/^[0-9]+$/)) {
                dataObj[item.setting_key] = item.setting_value;
              }
            });
          } else if (typeof res.data === 'object') {
            dataObj = res.data;
          }
          setSettings((prev) => ({
            ...prev,
            ...dataObj,
            church_tagline: dataObj.church_tagline || dataObj.tagline || prev.church_tagline,
          }));
        }
      })
      .catch((err) => {
        console.error('Failed to load settings:', err);
        addToast('Failed to load settings', 'error');
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...settings,
        tagline: settings.church_tagline,
        // Extract clean YouTube IDs for featured videos
        featured_video_1: getYouTubeId(settings.featured_video_1),
        featured_video_2: getYouTubeId(settings.featured_video_2),
        featured_video_3: getYouTubeId(settings.featured_video_3),
        featured_video_4: getYouTubeId(settings.featured_video_4),
        featured_video_5: getYouTubeId(settings.featured_video_5),
      };
      const res = await api.admin.updateSettings(payload);
      if (res && (res.success || res.status === 'success' || !res.error)) {
        addToast('Church settings saved successfully!', 'success');
        if (reloadSettings) reloadSettings();
      } else {
        addToast(res?.message || 'Settings updated successfully', 'success');
        if (reloadSettings) reloadSettings();
      }
    } catch (err) {
      addToast(err.message || 'Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading settings...</span>
        </div>
      </div>
    );
  }

  const videoSlots = [
    { key: 'featured_video_1', label: 'Video 1 (Sunday Anointed Worship)' },
    { key: 'featured_video_2', label: "Video 2 (Walking in God's Promises)" },
    { key: 'featured_video_3', label: 'Video 3 (Miracles of Healing & Prayer)' },
    { key: 'featured_video_4', label: 'Video 4 (Special Anointing Service)' },
    { key: 'featured_video_5', label: 'Video 5 (The Promise 2026)' },
  ];

  return (
    <div className="admin-settings">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">General Site & Video Settings</h3>
          <p className="text-muted small mb-0">Configure church profile info, contact details, latest videos, and SEO metadata</p>
        </div>
        <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchSettings}>
          <i className="fas fa-sync-alt me-1"></i> Refresh
        </button>
      </div>

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs border-bottom mb-4" id="settingsTab" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${activeTab === 'general' ? 'active text-primary border-primary border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('general')}
          >
            <i className="fas fa-church me-2"></i> General Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${activeTab === 'videos' ? 'active text-primary border-primary border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('videos')}
          >
            <i className="fab fa-youtube me-2 text-danger"></i> Latest Videos (5)
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${activeTab === 'social' ? 'active text-primary border-primary border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('social')}
          >
            <i className="fas fa-share-alt me-2"></i> Social Links
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${activeTab === 'homepage' ? 'active text-primary border-primary border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('homepage')}
          >
            <i className="fas fa-home me-2"></i> Homepage Hero
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${activeTab === 'seo' ? 'active text-primary border-primary border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('seo')}
          >
            <i className="fas fa-search me-2"></i> SEO Metadata
          </button>
        </li>
      </ul>

      <form onSubmit={handleSubmit}>
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{ maxWidth: '900px' }}>
          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'general' && (
            <div>
              <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">Church Profile & Contact Details</h5>
              
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Church Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.church_name || ''}
                    onChange={(e) => handleChange('church_name', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Lead Pastor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pastor Jaskaran Heer"
                    value={settings.pastor_name || ''}
                    onChange={(e) => handleChange('pastor_name', e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tagline / Motto</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.church_tagline || ''}
                    onChange={(e) => handleChange('church_tagline', e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={settings.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Main Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">24/7 Telephone Prayer Tower Line</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.prayer_phone || ''}
                    onChange={(e) => handleChange('prayer_phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Church Physical Address</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={settings.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Church Description / Mission Statement</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={settings.church_description || ''}
                  onChange={(e) => handleChange('church_description', e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURED LATEST VIDEOS */}
          {activeTab === 'videos' && (
            <div>
              <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
                <div>
                  <h5 className="fw-bold mb-1 text-dark">Our Latest Videos (Homepage & Sermons)</h5>
                  <p className="text-muted small mb-0">Paste either the full YouTube URL or the 11-character YouTube video ID</p>
                </div>
                <span className="badge bg-danger text-white px-3 py-2 rounded-pill">5 Slots Active</span>
              </div>

              <div className="d-flex flex-column gap-3">
                {videoSlots.map((slot, index) => {
                  const currentId = getYouTubeId(settings[slot.key]);
                  return (
                    <div className="p-3 bg-light rounded-4 border" key={slot.key}>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-8">
                          <label className="form-label fw-bold mb-1 d-flex align-items-center gap-2">
                            <span className="badge bg-purple rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', backgroundColor: '#581C87', color: 'white' }}>
                              {index + 1}
                            </span>
                            {slot.label}
                          </label>
                          <input
                            type="text"
                            className="form-control font-monospace"
                            placeholder="e.g. https://www.youtube.com/watch?v=... or ID"
                            value={settings[slot.key] || ''}
                            onChange={(e) => handleChange(slot.key, e.target.value)}
                          />
                          <small className="text-muted">Extracted ID: <code className="text-purple">{currentId || 'None'}</code></small>
                        </div>
                        <div className="col-md-4 text-center">
                          {currentId ? (
                            <div className="position-relative rounded-3 overflow-hidden shadow-sm" style={{ maxHeight: '90px' }}>
                              <img
                                src={`https://img.youtube.com/vi/${currentId}/hqdefault.jpg`}
                                alt={`Preview ${index + 1}`}
                                className="w-100 h-100"
                                style={{ objectFit: 'cover', maxHeight: '90px' }}
                              />
                              <div className="position-absolute top-50 start-50 translate-middle badge bg-danger rounded-circle p-2">
                                <i className="fas fa-play text-white" style={{ fontSize: '10px' }}></i>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 border rounded text-muted small bg-white">
                              No preview available
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SOCIAL LINKS */}
          {activeTab === 'social' && (
            <div>
              <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">Social Media Handles</h5>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold"><i className="fab fa-facebook text-primary me-1"></i> Facebook URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={settings.facebook_url || ''}
                    onChange={(e) => handleChange('facebook_url', e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold"><i className="fab fa-instagram text-danger me-1"></i> Instagram URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={settings.instagram_url || ''}
                    onChange={(e) => handleChange('instagram_url', e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold"><i className="fab fa-youtube text-danger me-1"></i> YouTube Channel URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={settings.youtube_url || ''}
                    onChange={(e) => handleChange('youtube_url', e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold"><i className="fab fa-x-twitter text-dark me-1"></i> Twitter / X URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={settings.twitter_url || ''}
                    onChange={(e) => handleChange('twitter_url', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HOMEPAGE */}
          {activeTab === 'homepage' && (
            <div>
              <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">Hero Section & Daily Verse</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold">Hero Heading</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.hero_heading || ''}
                  onChange={(e) => handleChange('hero_heading', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Hero Subheading</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={settings.hero_subheading || ''}
                  onChange={(e) => handleChange('hero_subheading', e.target.value)}
                ></textarea>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Featured Bible Verse</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.bible_verse || ''}
                    onChange={(e) => handleChange('bible_verse', e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Verse Reference</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.bible_verse_reference || ''}
                    onChange={(e) => handleChange('bible_verse_reference', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SEO METADATA */}
          {activeTab === 'seo' && (
            <div>
              <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">Default Search Engine Metadata</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold">Meta Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.meta_title || ''}
                  onChange={(e) => handleChange('meta_title', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Meta Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={settings.meta_description || ''}
                  onChange={(e) => handleChange('meta_description', e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-end mt-4 pt-3 border-top">
            <button type="submit" className="btn btn-primary fw-semibold px-4 rounded-pill shadow-sm" disabled={saving}>
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving Changes...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i> Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;

