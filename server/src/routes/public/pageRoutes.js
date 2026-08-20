/**
 * Public Page, Service & Ministry Routes
 */
const express = require('express');
const router = express.Router();
const {
  getPageBySlug,
  getPublicServices,
  getPublicMinistries
} = require('../../controllers/pageController');

router.get('/services', getPublicServices);
router.get('/ministries', getPublicMinistries);
router.get('/pages/:slug', getPageBySlug);

module.exports = router;
