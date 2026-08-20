/**
 * Public Blog Routes
 */
const express = require('express');
const router = express.Router();
const { getPublicBlogs, getBlogBySlug, getBlogCategories } = require('../../controllers/blogController');

router.get('/', getPublicBlogs);
router.get('/categories', getBlogCategories);
router.get('/:slug', getBlogBySlug);

module.exports = router;
