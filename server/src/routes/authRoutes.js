/**
 * Authentication Routes
 */
const express = require('express');
const router = express.Router();
const { login, logout, getMe, changePassword } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const { loginSchema, changePasswordSchema } = require('../validators/authValidator');
const { authLimiter } = require('../middleware/rateLimiter');

// Public
router.post('/login', authLimiter, validateBody(loginSchema), login);

// Protected
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.put('/change-password', authenticate, validateBody(changePasswordSchema), changePassword);

module.exports = router;
