/**
 * Admin Blog Routes
 */
const express = require('express');
const router = express.Router();
const { getAdminBlogs, createBlog, updateBlog, deleteBlog } = require('../../controllers/blogController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/authorize');
const { uploadSingleImage } = require('../../middleware/upload');

router.use(authenticate);

router.get('/', requirePermission('blogs.read'), getAdminBlogs);
router.post('/', requirePermission('blogs.create'), uploadSingleImage('featured_image'), createBlog);
router.put('/:id', requirePermission('blogs.update'), uploadSingleImage('featured_image'), updateBlog);
router.delete('/:id', requirePermission('blogs.delete'), deleteBlog);

module.exports = router;
