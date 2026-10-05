import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useSettings } from '../../context/SettingsContext';

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
    facebook_url: 'https://www.facebook.com/Pastorjaskaranheer',
    instagram_url: 'https://instagram.com/thechurchofnewgeneration',
    youtube_url: 'https://www.youtube.com/@Pastorjaskaranheer',
    twitter_url: 'https://x.com/Jaskaranhee5',
    meta_title: 'The Church of New Generation Melbourne | Pastor Jaskaran Heer | Hindi Christian Church',
    meta_description: "Join Pastor Jaskaran Heer at The Church of New Generation, Melbourne's Hindi, English & Punjabi Christian church in Coolaroo VIC.",
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

  return (
    <div className="admin-settings">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">General Site Settings</h3>
          <p className="text-muted small mb-0">Configure church profile info, contact details, social links, and SEO metadata</p>
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
            className={`nav-link fw-semibold ${activeTab === 'social' ? 'active text-primary border-primary border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('social')}
          >
            <i className="fas fa-share-alt me-2"></i> Social Links
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

          {/* TAB 2: SOCIAL LINKS */}
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

          {/* TAB 3: SEO METADATA */}
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

