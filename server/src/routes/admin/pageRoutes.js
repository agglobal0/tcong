/**
 * Admin Pages, Services & Ministries Routes
 */
const express = require('express');
const router = express.Router();
const {
  getAdminPages, createPage, updatePage, deletePage,
  getAdminServices, createService, updateService, deleteService,
  getAdminMinistries, createMinistry, updateMinistry, deleteMinistry
} = require('../../controllers/pageController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/authorize');
const { uploadSingleImage } = require('../../middleware/upload');

router.use(authenticate);

// Pages
router.get('/pages', requirePermission('pages.read'), getAdminPages);
router.post('/pages', requirePermission('pages.create'), createPage);
router.put('/pages/:id', requirePermission('pages.update'), updatePage);
router.delete('/pages/:id', requirePermission('pages.delete'), deletePage);

// Services
router.get('/services', requirePermission('services.read'), getAdminServices);
router.post('/services', requirePermission('services.create'), createService);
router.put('/services/:id', requirePermission('services.update'), updateService);
router.delete('/services/:id', requirePermission('services.delete'), deleteService);

// Ministries
router.get('/ministries', requirePermission('ministries.read'), getAdminMinistries);
router.post('/ministries', requirePermission('ministries.create'), uploadSingleImage('image'), createMinistry);
router.put('/ministries/:id', requirePermission('ministries.update'), uploadSingleImage('image'), updateMinistry);
router.delete('/ministries/:id', requirePermission('ministries.delete'), deleteMinistry);

module.exports = router;
