-- =====================================================
-- The Church of New Generation (TCONG)
-- Production Database Setup & Initial Seed File for Hostinger
-- Compatibility: MySQL 8.0+ / MariaDB 10.4+ / Hostinger phpMyAdmin
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- =====================================================
-- 1. AUTHENTICATION & USERS
-- =====================================================

CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20),
  `avatar` VARCHAR(500),
  `role_id` INT NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT,
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_role` (`role_id`),
  INDEX `idx_users_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `module` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255),
  INDEX `idx_permissions_module` (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `token` VARCHAR(500) NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_refresh_token` (`token`(255)),
  INDEX `idx_refresh_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. PAGES CMS
-- =====================================================

CREATE TABLE IF NOT EXISTS `pages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `content` LONGTEXT,
  `meta_title` VARCHAR(255),
  `meta_description` VARCHAR(500),
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  `author_id` INT,
  `language` VARCHAR(10) DEFAULT 'en',
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_pages_slug` (`slug`),
  INDEX `idx_pages_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `page_translations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_id` INT NOT NULL,
  `language` VARCHAR(10) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT,
  `meta_title` VARCHAR(255),
  `meta_description` VARCHAR(500),
  FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_page_lang` (`page_id`, `language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. BLOG SYSTEM
-- =====================================================

CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `content` LONGTEXT,
  `excerpt` VARCHAR(500),
  `featured_image` VARCHAR(500),
  `author_id` INT,
  `category_id` INT,
  `meta_title` VARCHAR(255),
  `meta_description` VARCHAR(500),
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  `is_featured` TINYINT(1) DEFAULT 0,
  `view_count` INT DEFAULT 0,
  `published_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE SET NULL,
  INDEX `idx_blogs_slug` (`slug`),
  INDEX `idx_blogs_status` (`status`),
  INDEX `idx_blogs_featured` (`is_featured`),
  INDEX `idx_blogs_published` (`published_at`),
  INDEX `idx_blogs_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blog_tags` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blog_tag_relations` (
  `blog_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`blog_id`, `tag_id`),
  FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES `blog_tags`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. SERMONS
-- =====================================================

CREATE TABLE IF NOT EXISTS `sermon_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sermons` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `speaker` VARCHAR(150),
  `thumbnail` VARCHAR(500),
  `youtube_url` VARCHAR(500),
  `video_id` VARCHAR(50),
  `sermon_date` DATE,
  `category_id` INT,
  `is_featured` TINYINT(1) DEFAULT 0,
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  `view_count` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `sermon_categories`(`id`) ON DELETE SET NULL,
  INDEX `idx_sermons_status` (`status`),
  INDEX `idx_sermons_featured` (`is_featured`),
  INDEX `idx_sermons_date` (`sermon_date`),
  INDEX `idx_sermons_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. EVENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS `event_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `description` LONGTEXT,
  `featured_image` VARCHAR(500),
  `event_date` DATE NOT NULL,
  `start_time` TIME,
  `end_time` TIME,
  `location` VARCHAR(255),
  `maps_link` VARCHAR(500),
  `registration_link` VARCHAR(500),
  `livestream_link` VARCHAR(500),
  `category_id` INT,
  `status` ENUM('draft', 'published', 'cancelled', 'completed') DEFAULT 'draft',
  `is_featured` TINYINT(1) DEFAULT 0,
  `published_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `event_categories`(`id`) ON DELETE SET NULL,
  INDEX `idx_events_slug` (`slug`),
  INDEX `idx_events_status` (`status`),
  INDEX `idx_events_date` (`event_date`),
  INDEX `idx_events_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `event_registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `event_id` INT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE,
  INDEX `idx_event_reg_event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 6. SERVICES & MINISTRIES
-- =====================================================

CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT,
  `day_of_week` VARCHAR(20),
  `start_time` TIME,
  `end_time` TIME,
  `location` VARCHAR(255),
  `is_active` TINYINT(1) DEFAULT 1,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_services_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ministries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `description` TEXT,
  `image` VARCHAR(500),
  `leader` VARCHAR(150),
  `is_active` TINYINT(1) DEFAULT 1,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_ministries_slug` (`slug`),
  INDEX `idx_ministries_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 7. PRAYER REQUESTS
-- =====================================================

CREATE TABLE IF NOT EXISTS `prayer_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(255),
  `phone` VARCHAR(20),
  `request_text` TEXT NOT NULL,
  `category` ENUM('family', 'career', 'education', 'spiritual', 'financial', 'relationships', 'health', 'other') DEFAULT 'other',
  `type` VARCHAR(50) DEFAULT 'prayer_request',
  `is_anonymous` TINYINT(1) DEFAULT 0,
  `consent` TINYINT(1) DEFAULT 0,
  `status` ENUM('new', 'assigned', 'in_prayer', 'prayed', 'closed') DEFAULT 'new',
  `priority` ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  `assigned_to` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_prayer_type` (`type`),
  INDEX `idx_prayer_status` (`status`),
  INDEX `idx_prayer_priority` (`priority`),
  INDEX `idx_prayer_category` (`category`),
  INDEX `idx_prayer_assigned` (`assigned_to`),
  INDEX `idx_prayer_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `prayer_request_notes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `prayer_request_id` INT NOT NULL,
  `user_id` INT,
  `note` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`prayer_request_id`) REFERENCES `prayer_requests`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_prayer_notes_request` (`prayer_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. TESTIMONIALS & PRAISE REPORTS
-- =====================================================

CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `photo` VARCHAR(500),
  `testimonial_text` TEXT NOT NULL,
  `category` VARCHAR(100),
  `is_featured` TINYINT(1) DEFAULT 0,
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_testimonials_status` (`status`),
  INDEX `idx_testimonials_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9. GALLERY
-- =====================================================

CREATE TABLE IF NOT EXISTS `gallery_albums` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `cover_image` VARCHAR(500),
  `album_date` DATE,
  `is_published` TINYINT(1) DEFAULT 0,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_albums_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `album_id` INT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `caption` VARCHAR(255),
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`album_id`) REFERENCES `gallery_albums`(`id`) ON DELETE CASCADE,
  INDEX `idx_gallery_album` (`album_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 10. DONATIONS & PAYMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS `donations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `donor_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(255),
  `phone` VARCHAR(20),
  `amount` DECIMAL(12, 2) NOT NULL,
  `currency` VARCHAR(3) DEFAULT 'INR',
  `purpose` ENUM('general', 'mission', 'church_ministry', 'charity', 'building_fund', 'other') DEFAULT 'general',
  `gateway_order_id` VARCHAR(255),
  `gateway_payment_id` VARCHAR(255),
  `gateway_signature` VARCHAR(500),
  `payment_status` ENUM('pending', 'success', 'failed', 'refunded') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_donations_status` (`payment_status`),
  INDEX `idx_donations_purpose` (`purpose`),
  INDEX `idx_donations_created` (`created_at`),
  INDEX `idx_donations_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `payment_transactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `donation_id` INT NOT NULL,
  `gateway` VARCHAR(50) DEFAULT 'razorpay',
  `transaction_id` VARCHAR(255),
  `amount` DECIMAL(12, 2),
  `status` VARCHAR(50),
  `raw_response` JSON,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`donation_id`) REFERENCES `donations`(`id`) ON DELETE CASCADE,
  INDEX `idx_payment_donation` (`donation_id`),
  INDEX `idx_payment_transaction` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 11. CONTACT & SUBSCRIBERS
-- =====================================================

CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `subject` VARCHAR(255),
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `is_archived` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_contact_read` (`is_read`),
  INDEX `idx_contact_archived` (`is_archived`),
  INDEX `idx_contact_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `name` VARCHAR(150),
  `is_active` TINYINT(1) DEFAULT 1,
  `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` TIMESTAMP NULL,
  INDEX `idx_newsletter_active` (`is_active`),
  INDEX `idx_newsletter_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 12. MEDIA LIBRARY & SETTINGS
-- =====================================================

CREATE TABLE IF NOT EXISTS `media` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `size` INT NOT NULL,
  `path` VARCHAR(500) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255),
  `uploaded_by` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_media_type` (`mime_type`),
  INDEX `idx_media_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT,
  `setting_group` VARCHAR(50) DEFAULT 'general',
  `setting_type` VARCHAR(20) DEFAULT 'text',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_settings_key` (`setting_key`),
  INDEX `idx_settings_group` (`setting_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `seo_metadata` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_identifier` VARCHAR(100) NOT NULL UNIQUE,
  `meta_title` VARCHAR(255),
  `meta_description` VARCHAR(500),
  `og_title` VARCHAR(255),
  `og_description` VARCHAR(500),
  `og_image` VARCHAR(500),
  `canonical_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_seo_page` (`page_identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT,
  `action` VARCHAR(100) NOT NULL,
  `entity_type` VARCHAR(50),
  `entity_id` INT,
  `details` TEXT,
  `ip_address` VARCHAR(45),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_activity_user` (`user_id`),
  INDEX `idx_activity_entity` (`entity_type`, `entity_id`),
  INDEX `idx_activity_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT,
  `type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT,
  `data` JSON,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_notifications_user` (`user_id`),
  INDEX `idx_notifications_read` (`is_read`),
  INDEX `idx_notifications_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `analytics_events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `event_type` VARCHAR(50) NOT NULL,
  `page_url` VARCHAR(500),
  `referrer` VARCHAR(500),
  `session_id` VARCHAR(100),
  `ip_address` VARCHAR(45),
  `user_agent` VARCHAR(500),
  `metadata` JSON,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_analytics_type` (`event_type`),
  INDEX `idx_analytics_created` (`created_at`),
  INDEX `idx_analytics_session` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 13. SEED DATA (ROLES & INITIAL PERMISSIONS)
-- =====================================================

INSERT IGNORE INTO `roles` (`id`, `name`, `slug`, `description`) VALUES
  (1, 'Super Admin', 'super_admin', 'Full access to all features'),
  (2, 'Content Manager', 'content_manager', 'Manage blogs, sermons, pages, gallery, testimonials'),
  (3, 'Event Manager', 'event_manager', 'Manage events and services'),
  (4, 'Prayer Manager', 'prayer_manager', 'Manage prayer requests'),
  (5, 'Finance Manager', 'finance_manager', 'Manage donations and finances');

INSERT IGNORE INTO `permissions` (`name`, `slug`, `module`, `description`) VALUES
  ('blogs.create', 'blogs.create', 'blogs', 'create blogs'),
  ('blogs.read', 'blogs.read', 'blogs', 'read blogs'),
  ('blogs.update', 'blogs.update', 'blogs', 'update blogs'),
  ('blogs.delete', 'blogs.delete', 'blogs', 'delete blogs'),
  ('blogs.publish', 'blogs.publish', 'blogs', 'publish blogs'),
  ('blogs.manage', 'blogs.manage', 'blogs', 'manage blogs'),
  ('sermons.create', 'sermons.create', 'sermons', 'create sermons'),
  ('sermons.read', 'sermons.read', 'sermons', 'read sermons'),
  ('sermons.update', 'sermons.update', 'sermons', 'update sermons'),
  ('sermons.delete', 'sermons.delete', 'sermons', 'delete sermons'),
  ('sermons.publish', 'sermons.publish', 'sermons', 'publish sermons'),
  ('sermons.manage', 'sermons.manage', 'sermons', 'manage sermons'),
  ('events.create', 'events.create', 'events', 'create events'),
  ('events.read', 'events.read', 'events', 'read events'),
  ('events.update', 'events.update', 'events', 'update events'),
  ('events.delete', 'events.delete', 'events', 'delete events'),
  ('events.publish', 'events.publish', 'events', 'publish events'),
  ('events.manage', 'events.manage', 'events', 'manage events'),
  ('prayer_requests.create', 'prayer_requests.create', 'prayer_requests', 'create prayer_requests'),
  ('prayer_requests.read', 'prayer_requests.read', 'prayer_requests', 'read prayer_requests'),
  ('prayer_requests.update', 'prayer_requests.update', 'prayer_requests', 'update prayer_requests'),
  ('prayer_requests.delete', 'prayer_requests.delete', 'prayer_requests', 'delete prayer_requests'),
  ('prayer_requests.publish', 'prayer_requests.publish', 'prayer_requests', 'publish prayer_requests'),
  ('prayer_requests.manage', 'prayer_requests.manage', 'prayer_requests', 'manage prayer_requests'),
  ('donations.create', 'donations.create', 'donations', 'create donations'),
  ('donations.read', 'donations.read', 'donations', 'read donations'),
  ('donations.update', 'donations.update', 'donations', 'update donations'),
  ('donations.delete', 'donations.delete', 'donations', 'delete donations'),
  ('donations.publish', 'donations.publish', 'donations', 'publish donations'),
  ('donations.manage', 'donations.manage', 'donations', 'manage donations'),
  ('settings.manage', 'settings.manage', 'settings', 'manage settings'),
  ('users.manage', 'users.manage', 'users', 'manage users');

-- =====================================================
-- 14. DEFAULT ADMIN USER
-- Login: admin@tcong.org / Password: Admin@123456
-- =====================================================

INSERT INTO `users` (`id`, `email`, `password_hash`, `first_name`, `last_name`, `role_id`, `is_active`)
VALUES (1, 'admin@tcong.org', '$2a$10$rCtmFuDYaykQQu7v2VnxGecVtl2A.qd8KWHw5iK1cI86liBp/DWWi', 'Super', 'Admin', 1, 1)
ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`), `is_active` = 1;

-- =====================================================
-- 15. SITE SETTINGS & CHURCH PROFILE
-- =====================================================

INSERT IGNORE INTO `site_settings` (`setting_key`, `setting_value`, `setting_group`, `setting_type`) VALUES
  ('church_name', 'The Church of New Generation', 'general', 'text'),
  ('church_tagline', 'A Community of Faith, Hope, and Love', 'general', 'text'),
  ('church_description', 'Welcome to The Church of New Generation Melbourne, led by Pastor Jaskaran Heer. A spirit-filled Hindi, English and Punjabi Christian church in Coolaroo VIC.', 'general', 'textarea'),
  ('hero_heading', 'The Church of New Generation Melbourne', 'homepage', 'text'),
  ('hero_subheading', 'Led by Pastor Jaskaran Heer. Join our powerful Hindi, English & Punjabi Sunday Worship Services and experience miracles, breakthroughs, and healing.', 'homepage', 'textarea'),
  ('hero_cta_primary', 'Join Us', 'homepage', 'text'),
  ('hero_cta_secondary', 'Submit a Prayer Request', 'homepage', 'text'),
  ('bible_verse', 'For where two or three gather in my name, there am I with them.', 'homepage', 'textarea'),
  ('bible_verse_reference', 'Matthew 18:20', 'homepage', 'text'),
  ('address', 'Progress Community Hall, Unit 27/59 Almurta Ave, Coolaroo VIC 3048, Melbourne, Australia', 'contact', 'text'),
  ('phone', '+61 481 839 109', 'contact', 'text'),
  ('email', 'info@tcong.org', 'contact', 'email'),
  ('facebook_url', 'https://facebook.com/tcong', 'social', 'url'),
  ('instagram_url', 'https://instagram.com/thechurchofnewgeneration', 'social', 'url'),
  ('youtube_url', 'https://youtube.com/@Pastorjaskaranheer', 'social', 'url'),
  ('featured_video_1', '79U7kKk5U7I', 'homepage', 'text'),
  ('featured_video_2', '64Z-yQ0kQjE', 'homepage', 'text'),
  ('featured_video_3', 'jYFq5eP2m_4', 'homepage', 'text'),
  ('featured_video_4', 'G8MzgsAzK3s', 'homepage', 'text'),
  ('featured_video_5', 'kyU3dD54vqA', 'homepage', 'text'),
  ('meta_title', 'The Church of New Generation Melbourne | Pastor Jaskaran Heer', 'seo', 'text'),
  ('meta_description', 'Official website of The Church of New Generation Melbourne. Sunday worship, 24/7 prayer tower, sermons, events, and testimonies in Hindi, English & Punjabi.', 'seo', 'textarea');

-- =====================================================
-- 16. CATEGORIES & SERVICES
-- =====================================================

INSERT IGNORE INTO `blog_categories` (`id`, `name`, `slug`, `description`) VALUES
  (1, 'Devotionals', 'devotionals', 'Daily devotional readings and reflections'),
  (2, 'Church News', 'church-news', 'Updates and announcements from the church'),
  (3, 'Faith & Life', 'faith-and-life', 'Articles about living out your faith'),
  (4, 'Bible Study', 'bible-study', 'In-depth Bible study resources'),
  (5, 'Community', 'community', 'Stories from our church community');

INSERT IGNORE INTO `sermon_categories` (`id`, `name`, `slug`, `description`) VALUES
  (1, 'Sunday Sermons', 'sunday-sermons', 'Messages from our Sunday services'),
  (2, 'Bible Teaching', 'bible-teaching', 'In-depth biblical teaching series'),
  (3, 'Special Events', 'special-events', 'Messages from special church events'),
  (4, 'Healing & Miracles', 'healing-miracles', 'Messages on faith, healing, and supernatural breakthroughs'),
  (5, 'Youth Messages', 'youth-messages', 'Messages for the younger generation');

INSERT IGNORE INTO `event_categories` (`id`, `name`, `slug`, `description`) VALUES
  (1, 'Worship Service', 'worship-service', 'Regular weekly Sunday services'),
  (2, 'Prayer Tower Night', 'prayer-tower-night', '24/7 Intercession and Miracle nights'),
  (3, 'Youth Fellowship', 'youth-fellowship', 'NextGen youth and teen gatherings'),
  (4, 'Special Conferences', 'special-conferences', 'Annual church conferences and crusades');

INSERT IGNORE INTO `services` (`id`, `name`, `description`, `day_of_week`, `start_time`, `end_time`, `location`, `is_active`, `sort_order`) VALUES
  (1, 'Sunday Worship Service', 'Main worship service in Hindi, English and Punjabi. Word of God, praise and healing prayers.', 'Sunday', '10:30:00', '13:00:00', 'Progress Community Hall, Coolaroo VIC', 1, 1),
  (2, 'Wednesday Miracle Prayer Night', 'Mid-week powerful intercession for families, sickness, debt, and immigration breakthroughs.', 'Wednesday', '18:30:00', '20:00:00', 'Progress Community Hall, Coolaroo VIC', 1, 2),
  (3, 'Saturday NextGen Youth Fellowship', 'Youth ministry fellowship, praise songs, games, and biblical mentorship.', 'Saturday', '17:00:00', '19:00:00', 'Youth Hall', 1, 3);

SET FOREIGN_KEY_CHECKS = 1;
