/**
 * Admin Prayer Request Routes
 */
const express = require('express');
const router = express.Router();
const {
  getAdminPrayerRequests,
  getAdminPrayerRequestById,
  updateAdminPrayerRequest,
  addPrayerRequestNote
} = require('../../controllers/prayerController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/authorize');

router.use(authenticate);

router.get('/', requirePermission('prayer_requests.read'), getAdminPrayerRequests);
router.get('/:id', requirePermission('prayer_requests.read'), getAdminPrayerRequestById);
router.put('/:id', requirePermission('prayer_requests.update'), updateAdminPrayerRequest);
router.post('/:id/notes', requirePermission('prayer_requests.update'), addPrayerRequestNote);

module.exports = router;
