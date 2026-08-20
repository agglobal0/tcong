/**
 * Admin Donation Routes
 */
const express = require('express');
const router = express.Router();
const { getAdminDonations } = require('../../controllers/donationController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/authorize');

router.use(authenticate);

router.get('/', requirePermission('donations.read'), getAdminDonations);

module.exports = router;
