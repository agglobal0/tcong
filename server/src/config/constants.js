/**
 * Application Constants
 * Centralized enums and configuration values
 */

module.exports = {
  // User Roles
  ROLES: {
    SUPER_ADMIN: 'super_admin',
    CONTENT_MANAGER: 'content_manager',
    EVENT_MANAGER: 'event_manager',
    PRAYER_MANAGER: 'prayer_manager',
    FINANCE_MANAGER: 'finance_manager'
  },

  // Permission Modules
  MODULES: {
    BLOGS: 'blogs',
    SERMONS: 'sermons',
    EVENTS: 'events',
    PAGES: 'pages',
    GALLERY: 'gallery',
    TESTIMONIALS: 'testimonials',
    PRAYER_REQUESTS: 'prayer_requests',
    DONATIONS: 'donations',
    CONTACT: 'contact',
    NEWSLETTER: 'newsletter',
    USERS: 'users',
    SETTINGS: 'settings',
    MEDIA: 'media',
    SERVICES: 'services',
    MINISTRIES: 'ministries'
  },

  // Permission Actions
  ACTIONS: {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    PUBLISH: 'publish',
    MANAGE: 'manage'
  },

  // Content Statuses
  CONTENT_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
  },

  // Prayer Request Statuses
  PRAYER_STATUS: {
    NEW: 'new',
    ASSIGNED: 'assigned',
    IN_PRAYER: 'in_prayer',
    PRAYED: 'prayed',
    CLOSED: 'closed'
  },

  // Prayer Request Categories
  PRAYER_CATEGORIES: [
    'family',
    'career',
    'education',
    'spiritual',
    'financial',
    'relationships',
    'health',
    'other'
  ],

  // Prayer Priority
  PRAYER_PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent'
  },

  // Donation Statuses
  DONATION_STATUS: {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
    REFUNDED: 'refunded'
  },

  // Donation Purposes
  DONATION_PURPOSES: [
    'general',
    'mission',
    'church_ministry',
    'charity',
    'building_fund',
    'other'
  ],

  // Event Statuses
  EVENT_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed'
  },

  // Notification Types
  NOTIFICATION_TYPES: {
    PRAYER_REQUEST: 'prayer_request',
    CONTACT_MESSAGE: 'contact_message',
    DONATION: 'donation',
    EVENT_REGISTRATION: 'event_registration',
    NEW_BLOG: 'new_blog',
    SYSTEM: 'system'
  },

  // Analytics Event Types
  ANALYTICS_EVENTS: {
    PAGE_VIEW: 'page_view',
    PRAYER_SUBMIT: 'prayer_submit',
    DONATION_ATTEMPT: 'donation_attempt',
    CONTACT_SUBMIT: 'contact_submit',
    EVENT_CLICK: 'event_click',
    SERMON_CLICK: 'sermon_click',
    NEWSLETTER_SIGNUP: 'newsletter_signup'
  },

  // File Upload
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  ALLOWED_DOC_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024, // 5MB

  // Pagination Defaults
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,

  // Settings Groups
  SETTINGS_GROUPS: {
    GENERAL: 'general',
    CONTACT: 'contact',
    SOCIAL: 'social',
    SEO: 'seo',
    SERVICE_TIMES: 'service_times',
    HOMEPAGE: 'homepage'
  }
};
