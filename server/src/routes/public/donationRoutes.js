/**
 * Public Donation Routes
 */
const express = require('express');
const router = express.Router();
const { createDonation, verifyDonation } = require('../../controllers/donationController');

router.post('/create', createDonation);
router.post('/verify', verifyDonation);

module.exports = router;
