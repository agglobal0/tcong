/**
 * Admin Dashboard & Analytics Routes
 */
const express = require('express');
const router = express.Router();
const {
  getDashboardData,
  getNotifications,
  markNotificationRead,
  getActivityLogs
} = require('../../controllers/dashboardController');
const { authenticate } = require('../../middleware/auth');

router.use(authenticate);

router.get('/dashboard', getDashboardData);
router.get('/notifications', getNotifications);
router.put('/notifications/:id', markNotificationRead);
router.get('/activity-logs', getActivityLogs);

module.exports = router;
