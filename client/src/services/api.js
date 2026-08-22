/**
 * Centralized API Service for TCONG React Application
 */

const API_BASE = import.meta.env.VITE_API_URL || 'https://tcong.onrender.com/api';

export const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
      ...(!options.body || !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const config = {
      headers,
      credentials: 'include',
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401 && !endpoint.includes('/auth/login')) {
          if (window.location.pathname.startsWith('/admin')) {
            window.dispatchEvent(new CustomEvent('unauthorized'));
          }
        }
        throw { status: response.status, ...data };
      }

      return data;
    } catch (error) {
      if (error.status) throw error;
      console.error('API Error:', error);
      throw { success: false, message: error.message || 'Network error. Please check your connection.' };
    }
  },

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  // Auth
  auth: {
    login(email, password) {
      return api.post('/auth/login', { email, password });
    },
    logout() {
      return api.post('/auth/logout');
    },
    me() {
      return api.get('/auth/me');
    },
    changePassword(current_password, new_password) {
      return api.put('/auth/change-password', { current_password, new_password });
    },
  },

  // Public Endpoints
  public: {
    getSettings() {
      return api.get('/settings');
    },
    getBlogs(params = '') {
      return api.get(`/blogs${params}`);
    },
    getBlog(slug) {
      return api.get(`/blogs/${slug}`);
    },
    getEvents(params = '') {
      return api.get(`/events${params}`);
    },
    getEvent(id) {
      return api.get(`/events/${id}`);
    },
    getSermons(params = '') {
      return api.get(`/sermons${params}`);
    },
    getTestimonials(params = '') {
      return api.get(`/testimonials${params}`);
    },
    getGallery(params = '') {
      return api.get(`/gallery${params}`);
    },
    getServices() {
      return api.get('/services');
    },
    getMinistries() {
      return api.get('/ministries');
    },
    getPage(slug) {
      return api.get(`/pages/${slug}`);
    },
    submitPrayerRequest(data) {
      return api.post('/prayer-requests', data);
    },
    submitContact(data) {
      return api.post('/contact', data);
    },
    subscribe(data) {
      return api.post('/newsletter', data);
    },
    createDonation(data) {
      return api.post('/donations/create', data);
    },
    verifyDonation(data) {
      return api.post('/donations/verify', data);
    },
  },

  // Admin Endpoints
  admin: {
    getDashboard() {
      return api.get('/admin/dashboard');
    },
    // Blogs
    getBlogs(params = '') {
      return api.get(`/admin/blogs${params}`);
    },
    createBlog(formData) {
      return api.post('/admin/blogs', formData);
    },
    updateBlog(id, formData) {
      return api.put(`/admin/blogs/${id}`, formData);
    },
    deleteBlog(id) {
      return api.delete(`/admin/blogs/${id}`);
    },
    // Events
    getEvents(params = '') {
      return api.get(`/admin/events${params}`);
    },
    createEvent(formData) {
      return api.post('/admin/events', formData);
    },
    updateEvent(id, formData) {
      return api.put(`/admin/events/${id}`, formData);
    },
    deleteEvent(id) {
      return api.delete(`/admin/events/${id}`);
    },
    // Sermons
    getSermons(params = '') {
      return api.get(`/admin/sermons${params}`);
    },
    createSermon(formData) {
      return api.post('/admin/sermons', formData);
    },
    updateSermon(id, formData) {
      return api.put(`/admin/sermons/${id}`, formData);
    },
    deleteSermon(id) {
      return api.delete(`/admin/sermons/${id}`);
    },
    // Prayers
    getPrayers(params = '') {
      return api.get(`/admin/prayer-requests${params}`);
    },
    updatePrayer(id, data) {
      return api.put(`/admin/prayer-requests/${id}`, data);
    },
    addPrayerNote(id, note) {
      return api.post(`/admin/prayer-requests/${id}/notes`, { note });
    },
    // Donations
    getDonations(params = '') {
      return api.get(`/admin/donations${params}`);
    },
    // Gallery
    getAlbums(params = '') {
      return api.get(`/admin/gallery${params}`);
    },
    createAlbum(formData) {
      return api.post('/admin/gallery', formData);
    },
    deleteAlbum(id) {
      return api.delete(`/admin/gallery/${id}`);
    },
    // Messages
    getMessages(params = '') {
      return api.get(`/admin/messages${params}`);
    },
    updateMessage(id, data) {
      return api.put(`/admin/messages/${id}`, data);
    },
    deleteMessage(id) {
      return api.delete(`/admin/messages/${id}`);
    },
    // Settings
    getSettings() {
      return api.get('/admin/settings');
    },
    updateSettings(data) {
      return api.put('/admin/settings', data);
    },
    // Activity logs
    getActivityLogs(params = '') {
      return api.get(`/admin/activity-logs${params}`);
    },
  },
};
