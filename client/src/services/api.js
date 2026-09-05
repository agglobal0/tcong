const RENDER_BACKEND_URL = 'https://tcong.onrender.com/api';

const getApiBase = () => {
  let url = import.meta.env.VITE_API_URL;
  if (!url || typeof url !== 'string' || !url.trim()) {
    return '/api';
  }
  url = url.trim().replace(/\/+$/, '');
  if (!url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const API_BASE = getApiBase();

export const api = {
  async request(endpoint, options = {}) {
    let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    if (cleanEndpoint.startsWith('/api/')) {
      cleanEndpoint = cleanEndpoint.replace(/^\/api/, '');
    }

    const primaryUrl = `${API_BASE}${cleanEndpoint}`;
    const fallbackUrl = `${RENDER_BACKEND_URL}${cleanEndpoint}`;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const hasBody = options.body && !(options.body instanceof FormData);
    const headers = {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const config = {
      headers,
      ...options,
    };

    try {
      let response = await fetch(primaryUrl, config);
      const isJson = (response.headers.get('content-type') || '').includes('application/json');

      if ((!response.ok || !isJson) && primaryUrl !== fallbackUrl) {
        try {
          const fbRes = await fetch(fallbackUrl, config);
          const fbIsJson = (fbRes.headers.get('content-type') || '').includes('application/json');
          if (fbRes.ok && fbIsJson) {
            response = fbRes;
          }
        } catch (e) {}
      }

      const finalIsJson = (response.headers.get('content-type') || '').includes('application/json');
      if (!finalIsJson && !response.ok) {
        throw { status: response.status, message: `Server returned non-JSON response (${response.status})` };
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401 && !cleanEndpoint.includes('/auth/login')) {
          if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
            window.dispatchEvent(new CustomEvent('unauthorized'));
          }
        }
        const message = data.message || `Request failed with status ${response.status}`;
        throw { status: response.status, message, ...data };
      }

      return data;
    } catch (error) {
      if (primaryUrl !== fallbackUrl) {
        try {
          const fbRes = await fetch(fallbackUrl, config);
          const fbIsJson = (fbRes.headers.get('content-type') || '').includes('application/json');
          if (fbRes.ok && fbIsJson) {
            const fbData = await fbRes.json();
            return fbData;
          }
        } catch (e) {}
      }
      if (error.status && error.message) throw error;
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
