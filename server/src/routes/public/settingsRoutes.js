/**
 * Public Testimonials & Gallery & Settings Routes
 */
const express = require('express');
const router = express.Router();
const { getPublicTestimonials } = require('../../controllers/testimonialController');
const { getPublicAlbums, getAlbumImages } = require('../../controllers/galleryController');
const { getPublicSettings } = require('../../controllers/settingsController');

// Testimonials
router.get('/testimonials', getPublicTestimonials);

// Gallery
router.get('/gallery', getPublicAlbums);
router.get('/gallery/:albumId', getAlbumImages);

// Settings
router.get('/settings', getPublicSettings);

module.exports = router;
