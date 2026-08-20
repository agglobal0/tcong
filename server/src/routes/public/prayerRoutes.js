/**
 * Public Prayer Request Routes
 */
const express = require('express');
const router = express.Router();
const { submitPrayerRequest } = require('../../controllers/prayerController');
const { formLimiter } = require('../../middleware/rateLimiter');

router.post('/', formLimiter, submitPrayerRequest);

module.exports = router;
