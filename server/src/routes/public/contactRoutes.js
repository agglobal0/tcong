/**
 * Public Contact Routes
 */
const express = require('express');
const router = express.Router();
const { submitContactMessage, subscribeNewsletter } = require('../../controllers/contactController');
const { formLimiter } = require('../../middleware/rateLimiter');

router.post('/', formLimiter, submitContactMessage);
router.post('/newsletter', formLimiter, subscribeNewsletter);

module.exports = router;
