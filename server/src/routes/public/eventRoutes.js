/**
 * Public Event Routes
 */
const express = require('express');
const router = express.Router();
const { getPublicEvents, getEventById, getEventCategories } = require('../../controllers/eventController');

router.get('/', getPublicEvents);
router.get('/categories', getEventCategories);
router.get('/:id', getEventById);

module.exports = router;
