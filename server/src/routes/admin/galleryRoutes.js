/**
 * Admin Gallery & Testimonials Routes
 */
const express = require('express');
const router = express.Router();
const {
  getAdminAlbums, createAlbum, uploadAlbumImages, deleteGalleryImage, deleteAlbum
} = require('../../controllers/galleryController');
const {
  getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial
} = require('../../controllers/testimonialController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/authorize');
const { uploadSingleImage, uploadMultipleImages } = require('../../middleware/upload');

router.use(authenticate);

// Gallery
router.get('/gallery', requirePermission('gallery.read'), getAdminAlbums);
router.post('/gallery', requirePermission('gallery.create'), uploadSingleImage('cover_image'), createAlbum);
router.post('/gallery/:albumId/images', requirePermission('gallery.create'), uploadMultipleImages('images', 20), uploadAlbumImages);
router.delete('/gallery/images/:imageId', requirePermission('gallery.delete'), deleteGalleryImage);
router.delete('/gallery/:id', requirePermission('gallery.delete'), deleteAlbum);

// Testimonials
router.get('/testimonials', requirePermission('testimonials.read'), getAdminTestimonials);
router.post('/testimonials', requirePermission('testimonials.create'), uploadSingleImage('photo'), createTestimonial);
router.put('/testimonials/:id', requirePermission('testimonials.update'), uploadSingleImage('photo'), updateTestimonial);
router.delete('/testimonials/:id', requirePermission('testimonials.delete'), deleteTestimonial);

module.exports = router;
