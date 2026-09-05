-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 05, 2026 at 08:09 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tcong_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `entity_type` varchar(50) DEFAULT NULL,
  `entity_id` int DEFAULT NULL,
  `details` text,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_activity_user` (`user_id`),
  KEY `idx_activity_entity` (`entity_type`,`entity_id`),
  KEY `idx_activity_created` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action`, `entity_type`, `entity_id`, `details`, `ip_address`, `created_at`) VALUES
(1, 1, 'login', 'user', 1, NULL, '::ffff:127.0.0.1', '2026-08-17 13:02:27'),
(2, 1, 'login', 'user', 1, NULL, '::1', '2026-08-22 11:03:26');

-- --------------------------------------------------------

--
-- Table structure for table `analytics_events`
--

DROP TABLE IF EXISTS `analytics_events`;
CREATE TABLE IF NOT EXISTS `analytics_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_type` varchar(50) NOT NULL,
  `page_url` varchar(500) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_analytics_type` (`event_type`),
  KEY `idx_analytics_created` (`created_at`),
  KEY `idx_analytics_session` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext,
  `excerpt` varchar(500) DEFAULT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `is_featured` tinyint(1) DEFAULT '0',
  `view_count` int DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `author_id` (`author_id`),
  KEY `idx_blogs_slug` (`slug`),
  KEY `idx_blogs_status` (`status`),
  KEY `idx_blogs_featured` (`is_featured`),
  KEY `idx_blogs_published` (`published_at`),
  KEY `idx_blogs_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `content`, `excerpt`, `featured_image`, `author_id`, `category_id`, `meta_title`, `meta_description`, `status`, `is_featured`, `view_count`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Walking in Faith: A Daily Commitment', 'walking-in-faith-daily-commitment', '<p>Faith is not a one-time decision but a daily walk with God. Each morning brings new opportunities to trust Him, to lean not on our own understanding, but to acknowledge Him in all our ways.</p><p>As Proverbs 3:5-6 reminds us: \"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.\"</p><p>This daily commitment to faith transforms ordinary moments into extraordinary encounters with God\'s grace. Whether in times of joy or seasons of challenge, our faith anchors us to something greater than ourselves.</p>', 'Faith is not a one-time decision but a daily walk with God. Each morning brings new opportunities to trust Him.', NULL, 1, 1, NULL, NULL, 'published', 1, 0, '2026-08-17 12:57:30', '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(2, 'The Power of Community in Christian Life', 'power-of-community-christian-life', '<p>God designed us for community. From the very beginning, He said it was not good for man to be alone. The early church understood this deeply — they met together, broke bread, shared their possessions, and prayed with one another.</p><p>In today\'s fast-paced world, authentic community is more important than ever. At The Church of New Generation, we believe that spiritual growth happens best in the context of genuine relationships.</p><p>Finding your place in a church community means finding a family that celebrates your victories and carries you through your struggles.</p>', 'God designed us for community. The early church met together, broke bread, and prayed with one another.', NULL, 1, 3, NULL, NULL, 'published', 1, 2, '2026-08-17 12:57:30', '2026-08-17 12:57:30', '2026-08-17 13:18:45'),
(3, 'Finding Peace in Uncertain Times', 'finding-peace-uncertain-times', '<p>The world often feels uncertain and overwhelming. News cycles bring anxiety, personal challenges test our resolve, and the future can seem unclear. But as followers of Christ, we have access to a peace that surpasses all understanding.</p><p>Philippians 4:6-7 teaches us: \"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.\"</p><p>This peace isn\'t the absence of trouble — it\'s the presence of God in the midst of trouble.</p>', 'In uncertain times, followers of Christ have access to a peace that surpasses all understanding.', NULL, 1, 1, NULL, NULL, 'published', 0, 0, '2026-08-17 12:57:30', '2026-08-17 12:57:30', '2026-08-17 12:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

DROP TABLE IF EXISTS `blog_categories`;
CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `name`, `slug`, `description`, `created_at`) VALUES
(1, 'Devotionals', 'devotionals', 'Daily devotional readings and reflections', '2026-08-17 12:57:30'),
(2, 'Church News', 'church-news', 'Updates and announcements from the church', '2026-08-17 12:57:30'),
(3, 'Faith & Life', 'faith-and-life', 'Articles about living out your faith', '2026-08-17 12:57:30'),
(4, 'Bible Study', 'bible-study', 'In-depth Bible study resources', '2026-08-17 12:57:30'),
(5, 'Community', 'community', 'Stories from our church community', '2026-08-17 12:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `blog_tags`
--

DROP TABLE IF EXISTS `blog_tags`;
CREATE TABLE IF NOT EXISTS `blog_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_tag_relations`
--

DROP TABLE IF EXISTS `blog_tag_relations`;
CREATE TABLE IF NOT EXISTS `blog_tag_relations` (
  `blog_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`blog_id`,`tag_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `is_archived` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contact_read` (`is_read`),
  KEY `idx_contact_archived` (`is_archived`),
  KEY `idx_contact_created` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `phone`, `subject`, `message`, `is_read`, `is_archived`, `created_at`) VALUES
(1, 'ankit', 'ankitguraya3@gmail.com', NULL, 'abc', 'help me', 0, 0, '2026-08-17 13:31:58'),
(2, 'ankit', 'ankitguraya3@gmail.com', NULL, 'abc', 'help me\n', 0, 0, '2026-08-17 13:36:48'),
(4, 'ankit', 'ankitguraya3@gmail.com', '1234567899', 'abc', 'help', 0, 0, '2026-08-20 14:01:17'),
(5, 'Test Contact User', 'testcontact@example.com', '+91 9999999999', 'Test Subject', 'This is a test message to verify database storage.', 0, 0, '2026-08-22 11:03:26');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
CREATE TABLE IF NOT EXISTS `donations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donor_name` varchar(150) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(3) DEFAULT 'INR',
  `purpose` enum('general','mission','church_ministry','charity','building_fund','other') DEFAULT 'general',
  `gateway_order_id` varchar(255) DEFAULT NULL,
  `gateway_payment_id` varchar(255) DEFAULT NULL,
  `gateway_signature` varchar(500) DEFAULT NULL,
  `payment_status` enum('pending','success','failed','refunded') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_donations_status` (`payment_status`),
  KEY `idx_donations_purpose` (`purpose`),
  KEY `idx_donations_created` (`created_at`),
  KEY `idx_donations_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` longtext,
  `featured_image` varchar(500) DEFAULT NULL,
  `event_date` date NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `maps_link` varchar(500) DEFAULT NULL,
  `registration_link` varchar(500) DEFAULT NULL,
  `livestream_link` varchar(500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `status` enum('draft','published','cancelled','completed') DEFAULT 'draft',
  `is_featured` tinyint(1) DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  KEY `idx_events_slug` (`slug`),
  KEY `idx_events_status` (`status`),
  KEY `idx_events_date` (`event_date`),
  KEY `idx_events_featured` (`is_featured`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `slug`, `description`, `featured_image`, `event_date`, `start_time`, `end_time`, `location`, `maps_link`, `registration_link`, `livestream_link`, `category_id`, `status`, `is_featured`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Sunday Special Worship Night', 'sunday-special-worship-night', 'Join us for a special evening of extended worship, prayer, and God\'s presence. This will be a powerful time of seeking the Lord together as a church family.', NULL, '2026-08-24', '18:00:00', '21:00:00', 'Main Sanctuary', NULL, NULL, NULL, 1, 'published', 1, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(3, 'Community Outreach Day', 'community-outreach-day', 'A day dedicated to serving our local community through food drives, free health checkups, and community clean-up initiatives. Everyone is welcome to participate.', NULL, '2026-08-31', '08:00:00', '14:00:00', 'Church Grounds', NULL, NULL, NULL, 3, 'published', 0, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(4, 'blesses', 'blesses', 'meeting', '', '2026-08-20', NULL, NULL, 'jalandhar', '', '', '', NULL, 'published', 0, '2026-08-17 13:29:15', '2026-08-17 13:27:09', '2026-08-17 13:29:15'),
(6, 'Annual Church Conference 2026', 'annual-church-conference-2026', 'Our annual church conference brings together believers from across the region for three days of inspiring messages, workshops, and fellowship. Don\'t miss this life-changing event.', NULL, '2026-09-21', '09:00:00', '17:00:00', 'TCONG Convention Center', NULL, NULL, NULL, 2, 'published', 1, NULL, '2026-08-22 10:59:11', '2026-08-22 10:59:11');

-- --------------------------------------------------------

--
-- Table structure for table `event_categories`
--

DROP TABLE IF EXISTS `event_categories`;
CREATE TABLE IF NOT EXISTS `event_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event_categories`
--

INSERT INTO `event_categories` (`id`, `name`, `slug`, `description`, `created_at`) VALUES
(1, 'Worship', 'worship', 'Worship events and services', '2026-08-17 12:57:30'),
(2, 'Conference', 'conference', 'Church conferences and conventions', '2026-08-17 12:57:30'),
(3, 'Community', 'community', 'Community outreach events', '2026-08-17 12:57:30'),
(4, 'Youth', 'youth', 'Youth-focused events', '2026-08-17 12:57:30'),
(5, 'Prayer', 'prayer', 'Prayer meetings and retreats', '2026-08-17 12:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `event_registrations`
--

DROP TABLE IF EXISTS `event_registrations`;
CREATE TABLE IF NOT EXISTS `event_registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_event_reg_event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_albums`
--

DROP TABLE IF EXISTS `gallery_albums`;
CREATE TABLE IF NOT EXISTS `gallery_albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `cover_image` varchar(500) DEFAULT NULL,
  `album_date` date DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT '0',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_albums_published` (`is_published`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gallery_albums`
--

INSERT INTO `gallery_albums` (`id`, `title`, `description`, `cover_image`, `album_date`, `is_published`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'pastor', '', '', '2026-08-19', 0, 0, '2026-08-19 08:44:04', '2026-08-19 08:44:04'),
(2, 'pastor', '', '', '2026-08-19', 0, 0, '2026-08-19 08:44:06', '2026-08-19 08:44:06');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_images`
--

DROP TABLE IF EXISTS `gallery_images`;
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_gallery_album` (`album_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
CREATE TABLE IF NOT EXISTS `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `size` int NOT NULL,
  `path` varchar(500) NOT NULL,
  `url` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `uploaded_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uploaded_by` (`uploaded_by`),
  KEY `idx_media_type` (`mime_type`),
  KEY `idx_media_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ministries`
--

DROP TABLE IF EXISTS `ministries`;
CREATE TABLE IF NOT EXISTS `ministries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `description` text,
  `image` varchar(500) DEFAULT NULL,
  `leader` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_ministries_slug` (`slug`),
  KEY `idx_ministries_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ministries`
--

INSERT INTO `ministries` (`id`, `name`, `slug`, `description`, `image`, `leader`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Worship Ministry', 'worship-ministry', 'Leading the congregation in praise and worship through music and song.', NULL, 'Worship Leader', 1, 1, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(2, 'Youth Ministry', 'youth-ministry', 'Empowering young people to grow in their faith and leadership skills.', NULL, 'Youth Pastor', 1, 2, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(3, 'Children\'s Ministry', 'childrens-ministry', 'Nurturing children in a safe, fun environment where they learn about God\'s love.', NULL, 'Children\'s Director', 1, 3, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(4, 'Prayer Ministry', 'prayer-ministry', 'Dedicated intercessors committed to praying for the church and community.', NULL, 'Prayer Coordinator', 1, 4, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(5, 'Outreach Ministry', 'outreach-ministry', 'Serving the community through charitable works and evangelism.', NULL, 'Outreach Director', 1, 5, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(6, 'Women\'s Ministry', 'womens-ministry', 'Building a sisterhood of faith through Bible studies, events, and support groups.', NULL, 'Women\'s Leader', 1, 6, '2026-08-17 12:57:30', '2026-08-17 12:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

DROP TABLE IF EXISTS `newsletter_subscribers`;
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `subscribed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_newsletter_active` (`is_active`),
  KEY `idx_newsletter_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text,
  `data` json DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_notifications_user` (`user_id`),
  KEY `idx_notifications_read` (`is_read`),
  KEY `idx_notifications_created` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `data`, `is_read`, `created_at`) VALUES
(1, NULL, 'contact_message', 'New Contact Message', 'New message from ankit: \"abc\"', '{\"email\": \"ankitguraya3@gmail.com\", \"message_id\": 1}', 0, '2026-08-17 13:31:58'),
(2, NULL, 'prayer_request', 'New Prayer Request', 'New prayer request from John Doe (healing)', '{\"category\": \"healing\", \"prayer_request_id\": 1}', 0, '2026-08-17 13:35:42'),
(3, NULL, 'contact_message', 'New Contact Message', 'New message from ankit: \"abc\"', '{\"email\": \"ankitguraya3@gmail.com\", \"message_id\": 2}', 0, '2026-08-17 13:36:48'),
(4, NULL, 'prayer_request', 'New Prayer Request', 'New prayer request from ankit (General)', '{\"category\": \"General\", \"prayer_request_id\": 2}', 0, '2026-08-18 12:27:35'),
(5, NULL, 'contact_message', 'New Contact Message', 'New message from Test Visitor: \"Inquiry\"', '{\"email\": \"visitor@example.com\", \"message_id\": 3}', 0, '2026-08-19 09:27:05'),
(6, NULL, 'prayer_request', 'New Prayer Request', 'New prayer request from ankit (Healing)', '{\"category\": \"Healing\", \"prayer_request_id\": 3}', 0, '2026-08-20 14:00:52'),
(7, NULL, 'contact_message', 'New Contact Message', 'New message from ankit: \"abc\"', '{\"email\": \"ankitguraya3@gmail.com\", \"message_id\": 4}', 0, '2026-08-20 14:01:18'),
(8, NULL, 'contact_message', 'New Contact Message', 'New message from Test Contact User: \"Test Subject\"', '{\"email\": \"testcontact@example.com\", \"message_id\": 5}', 0, '2026-08-22 11:03:27'),
(9, NULL, 'prayer_request', 'New Prayer Request', 'New prayer request from Test Prayer Requestor (health)', '{\"category\": \"health\", \"prayer_request_id\": 4}', 0, '2026-08-22 11:03:27');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
CREATE TABLE IF NOT EXISTS `pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `author_id` int DEFAULT NULL,
  `language` varchar(10) DEFAULT 'en',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `author_id` (`author_id`),
  KEY `idx_pages_slug` (`slug`),
  KEY `idx_pages_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page_translations`
--

DROP TABLE IF EXISTS `page_translations`;
CREATE TABLE IF NOT EXISTS `page_translations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_id` int NOT NULL,
  `language` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_page_lang` (`page_id`,`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_transactions`
--

DROP TABLE IF EXISTS `payment_transactions`;
CREATE TABLE IF NOT EXISTS `payment_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donation_id` int NOT NULL,
  `gateway` varchar(50) DEFAULT 'razorpay',
  `transaction_id` varchar(255) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `raw_response` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_payment_donation` (`donation_id`),
  KEY `idx_payment_transaction` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `module` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_permissions_module` (`module`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `slug`, `module`, `description`) VALUES
(1, 'blogs.create', 'blogs.create', 'blogs', 'create blogs'),
(2, 'blogs.read', 'blogs.read', 'blogs', 'read blogs'),
(3, 'blogs.update', 'blogs.update', 'blogs', 'update blogs'),
(4, 'blogs.delete', 'blogs.delete', 'blogs', 'delete blogs'),
(5, 'blogs.publish', 'blogs.publish', 'blogs', 'publish blogs'),
(6, 'blogs.manage', 'blogs.manage', 'blogs', 'manage blogs'),
(7, 'sermons.create', 'sermons.create', 'sermons', 'create sermons'),
(8, 'sermons.read', 'sermons.read', 'sermons', 'read sermons'),
(9, 'sermons.update', 'sermons.update', 'sermons', 'update sermons'),
(10, 'sermons.delete', 'sermons.delete', 'sermons', 'delete sermons'),
(11, 'sermons.publish', 'sermons.publish', 'sermons', 'publish sermons'),
(12, 'sermons.manage', 'sermons.manage', 'sermons', 'manage sermons'),
(13, 'events.create', 'events.create', 'events', 'create events'),
(14, 'events.read', 'events.read', 'events', 'read events'),
(15, 'events.update', 'events.update', 'events', 'update events'),
(16, 'events.delete', 'events.delete', 'events', 'delete events'),
(17, 'events.publish', 'events.publish', 'events', 'publish events'),
(18, 'events.manage', 'events.manage', 'events', 'manage events'),
(19, 'pages.create', 'pages.create', 'pages', 'create pages'),
(20, 'pages.read', 'pages.read', 'pages', 'read pages'),
(21, 'pages.update', 'pages.update', 'pages', 'update pages'),
(22, 'pages.delete', 'pages.delete', 'pages', 'delete pages'),
(23, 'pages.publish', 'pages.publish', 'pages', 'publish pages'),
(24, 'pages.manage', 'pages.manage', 'pages', 'manage pages'),
(25, 'gallery.create', 'gallery.create', 'gallery', 'create gallery'),
(26, 'gallery.read', 'gallery.read', 'gallery', 'read gallery'),
(27, 'gallery.update', 'gallery.update', 'gallery', 'update gallery'),
(28, 'gallery.delete', 'gallery.delete', 'gallery', 'delete gallery'),
(29, 'gallery.publish', 'gallery.publish', 'gallery', 'publish gallery'),
(30, 'gallery.manage', 'gallery.manage', 'gallery', 'manage gallery'),
(31, 'testimonials.create', 'testimonials.create', 'testimonials', 'create testimonials'),
(32, 'testimonials.read', 'testimonials.read', 'testimonials', 'read testimonials'),
(33, 'testimonials.update', 'testimonials.update', 'testimonials', 'update testimonials'),
(34, 'testimonials.delete', 'testimonials.delete', 'testimonials', 'delete testimonials'),
(35, 'testimonials.publish', 'testimonials.publish', 'testimonials', 'publish testimonials'),
(36, 'testimonials.manage', 'testimonials.manage', 'testimonials', 'manage testimonials'),
(37, 'prayer_requests.create', 'prayer_requests.create', 'prayer_requests', 'create prayer_requests'),
(38, 'prayer_requests.read', 'prayer_requests.read', 'prayer_requests', 'read prayer_requests'),
(39, 'prayer_requests.update', 'prayer_requests.update', 'prayer_requests', 'update prayer_requests'),
(40, 'prayer_requests.delete', 'prayer_requests.delete', 'prayer_requests', 'delete prayer_requests'),
(41, 'prayer_requests.publish', 'prayer_requests.publish', 'prayer_requests', 'publish prayer_requests'),
(42, 'prayer_requests.manage', 'prayer_requests.manage', 'prayer_requests', 'manage prayer_requests'),
(43, 'donations.create', 'donations.create', 'donations', 'create donations'),
(44, 'donations.read', 'donations.read', 'donations', 'read donations'),
(45, 'donations.update', 'donations.update', 'donations', 'update donations'),
(46, 'donations.delete', 'donations.delete', 'donations', 'delete donations'),
(47, 'donations.publish', 'donations.publish', 'donations', 'publish donations'),
(48, 'donations.manage', 'donations.manage', 'donations', 'manage donations'),
(49, 'contact.create', 'contact.create', 'contact', 'create contact'),
(50, 'contact.read', 'contact.read', 'contact', 'read contact'),
(51, 'contact.update', 'contact.update', 'contact', 'update contact'),
(52, 'contact.delete', 'contact.delete', 'contact', 'delete contact'),
(53, 'contact.publish', 'contact.publish', 'contact', 'publish contact'),
(54, 'contact.manage', 'contact.manage', 'contact', 'manage contact'),
(55, 'newsletter.create', 'newsletter.create', 'newsletter', 'create newsletter'),
(56, 'newsletter.read', 'newsletter.read', 'newsletter', 'read newsletter'),
(57, 'newsletter.update', 'newsletter.update', 'newsletter', 'update newsletter'),
(58, 'newsletter.delete', 'newsletter.delete', 'newsletter', 'delete newsletter'),
(59, 'newsletter.publish', 'newsletter.publish', 'newsletter', 'publish newsletter'),
(60, 'newsletter.manage', 'newsletter.manage', 'newsletter', 'manage newsletter'),
(61, 'users.create', 'users.create', 'users', 'create users'),
(62, 'users.read', 'users.read', 'users', 'read users'),
(63, 'users.update', 'users.update', 'users', 'update users'),
(64, 'users.delete', 'users.delete', 'users', 'delete users'),
(65, 'users.publish', 'users.publish', 'users', 'publish users'),
(66, 'users.manage', 'users.manage', 'users', 'manage users'),
(67, 'settings.create', 'settings.create', 'settings', 'create settings'),
(68, 'settings.read', 'settings.read', 'settings', 'read settings'),
(69, 'settings.update', 'settings.update', 'settings', 'update settings'),
(70, 'settings.delete', 'settings.delete', 'settings', 'delete settings'),
(71, 'settings.publish', 'settings.publish', 'settings', 'publish settings'),
(72, 'settings.manage', 'settings.manage', 'settings', 'manage settings'),
(73, 'media.create', 'media.create', 'media', 'create media'),
(74, 'media.read', 'media.read', 'media', 'read media'),
(75, 'media.update', 'media.update', 'media', 'update media'),
(76, 'media.delete', 'media.delete', 'media', 'delete media'),
(77, 'media.publish', 'media.publish', 'media', 'publish media'),
(78, 'media.manage', 'media.manage', 'media', 'manage media'),
(79, 'services.create', 'services.create', 'services', 'create services'),
(80, 'services.read', 'services.read', 'services', 'read services'),
(81, 'services.update', 'services.update', 'services', 'update services'),
(82, 'services.delete', 'services.delete', 'services', 'delete services'),
(83, 'services.publish', 'services.publish', 'services', 'publish services'),
(84, 'services.manage', 'services.manage', 'services', 'manage services'),
(85, 'ministries.create', 'ministries.create', 'ministries', 'create ministries'),
(86, 'ministries.read', 'ministries.read', 'ministries', 'read ministries'),
(87, 'ministries.update', 'ministries.update', 'ministries', 'update ministries'),
(88, 'ministries.delete', 'ministries.delete', 'ministries', 'delete ministries'),
(89, 'ministries.publish', 'ministries.publish', 'ministries', 'publish ministries'),
(90, 'ministries.manage', 'ministries.manage', 'ministries', 'manage ministries');

-- --------------------------------------------------------

--
-- Table structure for table `prayer_requests`
--

DROP TABLE IF EXISTS `prayer_requests`;
CREATE TABLE IF NOT EXISTS `prayer_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `request_text` text NOT NULL,
  `category` enum('family','career','education','spiritual','financial','relationships','health','other') DEFAULT 'other',
  `is_anonymous` tinyint(1) DEFAULT '0',
  `consent` tinyint(1) DEFAULT '0',
  `status` enum('new','assigned','in_prayer','prayed','closed') DEFAULT 'new',
  `priority` enum('low','medium','high','urgent') DEFAULT 'medium',
  `assigned_to` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_prayer_status` (`status`),
  KEY `idx_prayer_priority` (`priority`),
  KEY `idx_prayer_category` (`category`),
  KEY `idx_prayer_assigned` (`assigned_to`),
  KEY `idx_prayer_created` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `prayer_requests`
--

INSERT INTO `prayer_requests` (`id`, `name`, `email`, `phone`, `request_text`, `category`, `is_anonymous`, `consent`, `status`, `priority`, `assigned_to`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', NULL, NULL, 'Pray for health and guidance', '', 0, 1, 'prayed', 'medium', NULL, '2026-08-17 13:35:42', '2026-08-20 14:03:41'),
(2, 'ankit', 'ankitguraya3@gmail.com', NULL, 'help', '', 0, 0, 'prayed', 'medium', NULL, '2026-08-18 12:27:35', '2026-08-18 12:27:46'),
(3, 'ankit', 'ankitguraya3@gmail.com', NULL, 'abc', '', 0, 0, 'prayed', 'medium', NULL, '2026-08-20 14:00:52', '2026-08-20 14:03:39'),
(4, 'Test Prayer Requestor', 'testprayer@example.com', '+91 8888888888', 'Please pray for full recovery and health.', 'health', 0, 1, 'new', 'medium', NULL, '2026-08-22 11:03:27', '2026-08-22 11:03:27');

-- --------------------------------------------------------

--
-- Table structure for table `prayer_request_notes`
--

DROP TABLE IF EXISTS `prayer_request_notes`;
CREATE TABLE IF NOT EXISTS `prayer_request_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prayer_request_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_prayer_notes_request` (`prayer_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(500) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_refresh_token` (`token`(255)),
  KEY `idx_refresh_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `slug`, `description`, `created_at`) VALUES
(1, 'Super Admin', 'super_admin', 'Full access to all features', '2026-08-17 12:57:26'),
(2, 'Content Manager', 'content_manager', 'Manage blogs, sermons, pages, gallery, testimonials', '2026-08-17 12:57:26'),
(3, 'Event Manager', 'event_manager', 'Manage events and services', '2026-08-17 12:57:26'),
(4, 'Prayer Manager', 'prayer_manager', 'Manage prayer requests', '2026-08-17 12:57:26'),
(5, 'Finance Manager', 'finance_manager', 'Manage donations and finances', '2026-08-17 12:57:26');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 16),
(3, 17),
(3, 18),
(2, 19),
(2, 20),
(2, 21),
(2, 22),
(2, 23),
(2, 24),
(2, 25),
(2, 26),
(2, 27),
(2, 28),
(2, 29),
(2, 30),
(2, 31),
(2, 32),
(2, 33),
(2, 34),
(2, 35),
(2, 36),
(4, 37),
(4, 38),
(4, 39),
(4, 40),
(4, 41),
(4, 42),
(5, 43),
(5, 44),
(5, 45),
(5, 46),
(5, 47),
(5, 48),
(2, 73),
(2, 74),
(2, 75),
(2, 76),
(2, 77),
(2, 78),
(3, 79),
(3, 80),
(3, 81),
(3, 82),
(3, 83),
(3, 84);

-- --------------------------------------------------------

--
-- Table structure for table `seo_metadata`
--

DROP TABLE IF EXISTS `seo_metadata`;
CREATE TABLE IF NOT EXISTS `seo_metadata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_identifier` varchar(100) NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  `og_title` varchar(255) DEFAULT NULL,
  `og_description` varchar(500) DEFAULT NULL,
  `og_image` varchar(500) DEFAULT NULL,
  `canonical_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_identifier` (`page_identifier`),
  KEY `idx_seo_page` (`page_identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `seo_metadata`
--

INSERT INTO `seo_metadata` (`id`, `page_identifier`, `meta_title`, `meta_description`, `og_title`, `og_description`, `og_image`, `canonical_url`, `created_at`, `updated_at`) VALUES
(1, 'home', 'The Church of New Generation | Faith, Hope, Love', 'Welcome to The Church of New Generation. Join our vibrant community for worship, prayer, events, and spiritual growth.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(2, 'about', 'About Us | The Church of New Generation', 'Learn about The Church of New Generation — our mission, vision, values, and the leadership team guiding our community.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(3, 'events', 'Events | The Church of New Generation', 'Discover upcoming events, conferences, and community gatherings at The Church of New Generation.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(4, 'sermons', 'Sermons | The Church of New Generation', 'Watch and listen to powerful sermons and messages from The Church of New Generation.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(5, 'blog', 'Blog | The Church of New Generation', 'Read inspiring articles, devotionals, and church news from The Church of New Generation.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(6, 'prayer-request', 'Prayer Request | The Church of New Generation', 'Submit your prayer request to The Church of New Generation. Our prayer team is here for you.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(7, 'donate', 'Give | The Church of New Generation', 'Support the ministry of The Church of New Generation through your generous donations.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(8, 'contact', 'Contact Us | The Church of New Generation', 'Get in touch with The Church of New Generation. We would love to hear from you.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(9, 'gallery', 'Gallery | The Church of New Generation', 'Browse photos from services, events, and community life at The Church of New Generation.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(10, 'testimonials', 'Testimonials | The Church of New Generation', 'Read inspiring testimonials from members of The Church of New Generation community.', NULL, NULL, NULL, NULL, '2026-08-17 12:57:30', '2026-08-17 12:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `sermons`
--

DROP TABLE IF EXISTS `sermons`;
CREATE TABLE IF NOT EXISTS `sermons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `speaker` varchar(150) DEFAULT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `youtube_url` varchar(500) DEFAULT NULL,
  `video_id` varchar(50) DEFAULT NULL,
  `sermon_date` date DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT '0',
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `view_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sermons_status` (`status`),
  KEY `idx_sermons_featured` (`is_featured`),
  KEY `idx_sermons_date` (`sermon_date`),
  KEY `idx_sermons_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sermons`
--

INSERT INTO `sermons` (`id`, `title`, `description`, `speaker`, `thumbnail`, `youtube_url`, `video_id`, `sermon_date`, `category_id`, `is_featured`, `status`, `view_count`, `created_at`, `updated_at`) VALUES
(1, 'The Foundation of Faith', 'In this powerful message, we explore what it means to build our lives on the unshakeable foundation of faith in Jesus Christ. When storms come, only those built on the rock will stand firm.', 'Pastor Name', NULL, '', '', '2026-08-17', 1, 1, 'published', 0, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(2, 'Grace That Transforms', 'Discover how God\'s amazing grace is not just a theological concept but a transformative power that changes hearts, restores relationships, and renews minds.', 'Pastor Name', NULL, '', '', '2026-08-10', 1, 1, 'published', 0, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(3, 'Living with Purpose', 'God created each of us with a unique purpose. This message explores how to discover, develop, and deploy your God-given purpose for maximum impact in the Kingdom.', 'Pastor Name', NULL, '', '', '2026-08-03', 1, 0, 'published', 0, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(9, 'The Foundation of Faith', 'In this powerful message, we explore what it means to build our lives on the unshakeable foundation of faith in Jesus Christ. When storms come, only those built on the rock will stand firm.', 'Pastor Name', NULL, '', '', '2026-08-22', 1, 1, 'published', 0, '2026-08-22 10:59:11', '2026-08-22 10:59:11'),
(10, 'Grace That Transforms', 'Discover how God\'s amazing grace is not just a theological concept but a transformative power that changes hearts, restores relationships, and renews minds.', 'Pastor Name', NULL, '', '', '2026-08-15', 1, 1, 'published', 0, '2026-08-22 10:59:11', '2026-08-22 10:59:11'),
(11, 'Living with Purpose', 'God created each of us with a unique purpose. This message explores how to discover, develop, and deploy your God-given purpose for maximum impact in the Kingdom.', 'Pastor Name', NULL, '', '', '2026-08-08', 1, 0, 'published', 0, '2026-08-22 10:59:11', '2026-08-22 10:59:11');

-- --------------------------------------------------------

--
-- Table structure for table `sermon_categories`
--

DROP TABLE IF EXISTS `sermon_categories`;
CREATE TABLE IF NOT EXISTS `sermon_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sermon_categories`
--

INSERT INTO `sermon_categories` (`id`, `name`, `slug`, `description`, `created_at`) VALUES
(1, 'Sunday Sermons', 'sunday-sermons', 'Messages from our Sunday services', '2026-08-17 12:57:30'),
(2, 'Bible Teaching', 'bible-teaching', 'In-depth biblical teaching series', '2026-08-17 12:57:30'),
(3, 'Special Events', 'special-events', 'Messages from special church events', '2026-08-17 12:57:30'),
(4, 'Guest Speakers', 'guest-speakers', 'Messages from visiting speakers', '2026-08-17 12:57:30'),
(5, 'Youth Messages', 'youth-messages', 'Messages for the younger generation', '2026-08-17 12:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text,
  `day_of_week` varchar(20) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_services_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `day_of_week`, `start_time`, `end_time`, `location`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Sunday Worship Service', 'Our main weekly gathering for worship, prayer, and the Word of God. All are welcome.', 'Sunday', '09:00:00', '11:00:00', 'Main Sanctuary', 1, 1, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(2, 'Sunday Evening Service', 'An intimate evening of praise, prayer, and biblical teaching.', 'Sunday', '18:00:00', '19:30:00', 'Main Sanctuary', 1, 2, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(3, 'Wednesday Bible Study', 'Mid-week Bible study and discussion group. Dive deeper into God\'s Word.', 'Wednesday', '19:00:00', '20:30:00', 'Fellowship Hall', 1, 3, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(4, 'Friday Youth Service', 'A dynamic worship experience designed for young people aged 13-25.', 'Friday', '18:30:00', '20:00:00', 'Youth Center', 1, 4, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(5, 'Saturday Prayer Meeting', 'A dedicated time of corporate prayer for the church, community, and world.', 'Saturday', '07:00:00', '08:30:00', 'Prayer Room', 1, 5, '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(6, 'Sunday Worship Service', 'Our main weekly gathering for worship, prayer, and the Word of God. All are welcome.', 'Sunday', '09:00:00', '11:00:00', 'Main Sanctuary', 1, 1, '2026-08-19 08:36:31', '2026-08-19 08:36:31'),
(7, 'Sunday Evening Service', 'An intimate evening of praise, prayer, and biblical teaching.', 'Sunday', '18:00:00', '19:30:00', 'Main Sanctuary', 1, 2, '2026-08-19 08:36:31', '2026-08-19 08:36:31'),
(8, 'Wednesday Bible Study', 'Mid-week Bible study and discussion group. Dive deeper into God\'s Word.', 'Wednesday', '19:00:00', '20:30:00', 'Fellowship Hall', 1, 3, '2026-08-19 08:36:31', '2026-08-19 08:36:31'),
(9, 'Friday Youth Service', 'A dynamic worship experience designed for young people aged 13-25.', 'Friday', '18:30:00', '20:00:00', 'Youth Center', 1, 4, '2026-08-19 08:36:31', '2026-08-19 08:36:31'),
(10, 'Saturday Prayer Meeting', 'A dedicated time of corporate prayer for the church, community, and world.', 'Saturday', '07:00:00', '08:30:00', 'Prayer Room', 1, 5, '2026-08-19 08:36:31', '2026-08-19 08:36:31'),
(11, 'Sunday Worship Service', 'Our main weekly gathering for worship, prayer, and the Word of God. All are welcome.', 'Sunday', '09:00:00', '11:00:00', 'Main Sanctuary', 1, 1, '2026-08-22 10:59:10', '2026-08-22 10:59:10'),
(12, 'Sunday Evening Service', 'An intimate evening of praise, prayer, and biblical teaching.', 'Sunday', '18:00:00', '19:30:00', 'Main Sanctuary', 1, 2, '2026-08-22 10:59:10', '2026-08-22 10:59:10'),
(13, 'Wednesday Bible Study', 'Mid-week Bible study and discussion group. Dive deeper into God\'s Word.', 'Wednesday', '19:00:00', '20:30:00', 'Fellowship Hall', 1, 3, '2026-08-22 10:59:10', '2026-08-22 10:59:10'),
(14, 'Friday Youth Service', 'A dynamic worship experience designed for young people aged 13-25.', 'Friday', '18:30:00', '20:00:00', 'Youth Center', 1, 4, '2026-08-22 10:59:10', '2026-08-22 10:59:10'),
(15, 'Saturday Prayer Meeting', 'A dedicated time of corporate prayer for the church, community, and world.', 'Saturday', '07:00:00', '08:30:00', 'Prayer Room', 1, 5, '2026-08-22 10:59:10', '2026-08-22 10:59:10');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text,
  `setting_group` varchar(50) DEFAULT 'general',
  `setting_type` varchar(20) DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`),
  KEY `idx_settings_key` (`setting_key`),
  KEY `idx_settings_group` (`setting_group`)
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `setting_key`, `setting_value`, `setting_group`, `setting_type`, `created_at`, `updated_at`) VALUES
(1, 'church_name', 'Church of New Generation', 'general', 'text', '2026-08-17 12:57:29', '2026-08-19 08:53:15'),
(2, 'church_tagline', 'A Community of Faith, Hope, and Love', 'general', 'text', '2026-08-17 12:57:29', '2026-08-19 09:01:35'),
(3, 'church_description', 'Welcome to The Church of New Generation. We are a vibrant community of believers committed to growing in faith, serving with love, and making a difference in the world.', 'general', 'textarea', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(4, 'church_logo', '', 'general', 'image', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(5, 'church_favicon', '', 'general', 'image', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(6, 'hero_heading', 'Experience God\'s Love in Community', 'homepage', 'text', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(7, 'hero_subheading', 'Join us every Sunday as we worship, learn, and grow together. Everyone is welcome at The Church of New Generation.', 'homepage', 'textarea', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(8, 'hero_image', '', 'homepage', 'image', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(9, 'hero_cta_primary', 'Join Us', 'homepage', 'text', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(10, 'hero_cta_secondary', 'Submit a Prayer Request', 'homepage', 'text', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(11, 'bible_verse', 'For where two or three gather in my name, there am I with them.', 'homepage', 'textarea', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(12, 'bible_verse_reference', 'Matthew 18:20', 'homepage', 'text', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(13, 'address', '123 Faith Street, New Delhi, India 110', 'contact', 'text', '2026-08-17 12:57:29', '2026-08-19 09:06:52'),
(14, 'phone', '+91 98765 43210', 'contact', 'text', '2026-08-17 12:57:29', '2026-08-19 08:55:43'),
(15, 'email', 'infobyankit@tcong.org', 'contact', 'email', '2026-08-17 12:57:29', '2026-08-19 09:01:35'),
(16, 'maps_embed_url', '', 'contact', 'text', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(17, 'facebook_url', 'https://facebook.com/tcong', 'social', 'url', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(18, 'instagram_url', 'https://instagram.com/tcong', 'social', 'url', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(19, 'youtube_url', 'https://www.youtube.com/@Pastorjaskaranheer', 'social', 'url', '2026-08-17 12:57:29', '2026-08-19 09:11:25'),
(20, 'twitter_url', 'https://twitter.com/tcong', 'social', 'url', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(21, 'meta_title', 'The Church of New Generation | Faith, Hope, Love', 'seo', 'text', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(22, 'meta_description', 'The Church of New Generation is a vibrant Christian community dedicated to worship, prayer, and service. Join us for Sunday services, events, and more.', 'seo', 'textarea', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(23, 'og_image', '', 'seo', 'image', '2026-08-17 12:57:29', '2026-08-17 12:57:29'),
(215, 'tagline', 'A Community of Faith, Hope, and Love', 'general', 'text', '2026-08-19 09:01:36', '2026-08-19 09:01:36');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `photo` varchar(500) DEFAULT NULL,
  `testimonial_text` text NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT '0',
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_testimonials_status` (`status`),
  KEY `idx_testimonials_featured` (`is_featured`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `photo`, `testimonial_text`, `category`, `is_featured`, `status`, `created_at`, `updated_at`) VALUES
(1, 'A Grateful Member', NULL, 'The Church of New Generation has been a tremendous blessing to my family. The warmth and love we experienced from the first day made us feel at home. The teaching has helped us grow spiritually in ways we never imagined.', 'General', 1, 'published', '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(2, 'A Young Believer', NULL, 'I came to this church searching for answers and found so much more — a family, a purpose, and a deeper relationship with God. The youth ministry has been life-changing for me.', 'Youth', 1, 'published', '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(3, 'A Community Member', NULL, 'Even though I was not a regular churchgoer, the community outreach programs touched my life deeply. The genuine care and service showed me what true Christianity looks like.', 'Outreach', 1, 'published', '2026-08-17 12:57:30', '2026-08-17 12:57:30'),
(7, 'A Grateful Member', NULL, 'The Church of New Generation has been a tremendous blessing to my family. The warmth and love we experienced from the first day made us feel at home. The teaching has helped us grow spiritually in ways we never imagined.', 'General', 1, 'published', '2026-08-22 10:59:12', '2026-08-22 10:59:12'),
(8, 'A Young Believer', NULL, 'I came to this church searching for answers and found so much more — a family, a purpose, and a deeper relationship with God. The youth ministry has been life-changing for me.', 'Youth', 1, 'published', '2026-08-22 10:59:12', '2026-08-22 10:59:12'),
(9, 'A Community Member', NULL, 'Even though I was not a regular churchgoer, the community outreach programs touched my life deeply. The genuine care and service showed me what true Christianity looks like.', 'Outreach', 1, 'published', '2026-08-22 10:59:12', '2026-08-22 10:59:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `role_id` int NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email` (`email`),
  KEY `idx_users_role` (`role_id`),
  KEY `idx_users_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `avatar`, `role_id`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'admin@tcong.org', '$2a$12$BT5hcGJz2e6hJgrJWzKIwuA2kErefotXAjV898rUEWTl343iLpf0W', 'Super', 'Admin', NULL, NULL, 1, 1, '2026-08-22 11:03:26', '2026-08-17 12:57:29', '2026-08-22 11:03:26');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `blogs_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `blog_tag_relations`
--
ALTER TABLE `blog_tag_relations`
  ADD CONSTRAINT `blog_tag_relations_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_tag_relations_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `event_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `event_registrations`
--
ALTER TABLE `event_registrations`
  ADD CONSTRAINT `event_registrations_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD CONSTRAINT `gallery_images_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `gallery_albums` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `page_translations`
--
ALTER TABLE `page_translations`
  ADD CONSTRAINT `page_translations_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD CONSTRAINT `payment_transactions_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prayer_requests`
--
ALTER TABLE `prayer_requests`
  ADD CONSTRAINT `prayer_requests_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `prayer_request_notes`
--
ALTER TABLE `prayer_request_notes`
  ADD CONSTRAINT `prayer_request_notes_ibfk_1` FOREIGN KEY (`prayer_request_id`) REFERENCES `prayer_requests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prayer_request_notes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sermons`
--
ALTER TABLE `sermons`
  ADD CONSTRAINT `sermons_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `sermon_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
