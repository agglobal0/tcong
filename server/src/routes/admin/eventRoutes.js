/**
 * Admin Event Routes
 */
const express = require('express');
const router = express.Router();
const { getAdminEvents, createEvent, updateEvent, deleteEvent } = require('../../controllers/eventController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/authorize');
const { uploadSingleImage } = require('../../middleware/upload');

router.use(authenticate);

router.get('/', requirePermission('events.read'), getAdminEvents);
router.post('/', requirePermission('events.create'), uploadSingleImage('featured_image'), createEvent);
router.put('/:id', requirePermission('events.update'), uploadSingleImage('featured_image'), updateEvent);
router.delete('/:id', requirePermission('events.delete'), deleteEvent);

module.exports = router;
