/**
 * Admin Settings, Media, Users, Dashboard Routes
 */
const express = require('express');
const router = express.Router();
const { getAdminSettings, updateSettings } = require('../../controllers/settingsController');
const { getMedia, uploadMedia, deleteMedia } = require('../../controllers/mediaController');
const { getUsers, createUser, updateUser, deleteUser, getRoles } = require('../../controllers/userController');
const { getDashboardData, getNotifications, markNotificationRead, getActivityLogs } = require('../../controllers/dashboardController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission, requireRole } = require('../../middleware/authorize');
const { uploadSingleFile } = require('../../middleware/upload');

router.use(authenticate);

// Dashboard & System
router.get('/dashboard', getDashboardData);
router.get('/notifications', getNotifications);
router.put('/notifications/:id', markNotificationRead);
router.get('/activity-logs', requireRole('super_admin'), getActivityLogs);

// Settings
router.get('/settings', requirePermission('settings.read'), getAdminSettings);
router.put('/settings', requirePermission('settings.update'), updateSettings);

// Media
router.get('/media', requirePermission('media.read'), getMedia);
router.post('/media', requirePermission('media.create'), uploadSingleFile('file'), uploadMedia);
router.delete('/media/:id', requirePermission('media.delete'), deleteMedia);

// Users (Super Admin Only)
router.get('/users', requireRole('super_admin'), getUsers);
router.get('/roles', requireRole('super_admin'), getRoles);
router.post('/users', requireRole('super_admin'), createUser);
router.put('/users/:id', requireRole('super_admin'), updateUser);
router.delete('/users/:id', requireRole('super_admin'), deleteUser);

module.exports = router;
