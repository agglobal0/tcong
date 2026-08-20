/**
 * Admin Sermon Routes
 */
const express = require('express');
const router = express.Router();
const { getAdminSermons, createSermon, updateSermon, deleteSermon } = require('../../controllers/sermonController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/authorize');
const { uploadSingleImage } = require('../../middleware/upload');

router.use(authenticate);

router.get('/', requirePermission('sermons.read'), getAdminSermons);
router.post('/', requirePermission('sermons.create'), uploadSingleImage('thumbnail'), createSermon);
router.put('/:id', requirePermission('sermons.update'), uploadSingleImage('thumbnail'), updateSermon);
router.delete('/:id', requirePermission('sermons.delete'), deleteSermon);

module.exports = router;
