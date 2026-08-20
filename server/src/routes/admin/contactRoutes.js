/**
 * Admin Contact Messages & Subscribers Routes
 */
const express = require('express');
const router = express.Router();
const {
  getAdminContactMessages, updateContactMessage, deleteContactMessage, getAdminSubscribers
} = require('../../controllers/contactController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/authorize');

router.use(authenticate);

router.get('/messages', requirePermission('contact.read'), getAdminContactMessages);
router.put('/messages/:id', requirePermission('contact.update'), updateContactMessage);
router.delete('/messages/:id', requirePermission('contact.delete'), deleteContactMessage);
router.get('/subscribers', requirePermission('newsletter.read'), getAdminSubscribers);

module.exports = router;
