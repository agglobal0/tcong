/**
 * Public Sermon Routes
 */
const express = require('express');
const router = express.Router();
const { getPublicSermons, getSermonCategories } = require('../../controllers/sermonController');

router.get('/', getPublicSermons);
router.get('/categories', getSermonCategories);

module.exports = router;
