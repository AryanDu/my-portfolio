const express = require('express');
const BlogPost = require('../models/BlogPost');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// GET /api/blog - public, optional ?category=travel or ?category=gym
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const posts = await BlogPost.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Could not load posts.' });
  }
});

// POST /api/blog - admin only
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, location, content, imageUrls, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }
    const post = await BlogPost.create({ title, location, content, imageUrls, category });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Could not create post.' });
  }
});

// PUT /api/blog/:id - admin only
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Post not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not update post.' });
  }
});

// DELETE /api/blog/:id - admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found.' });
    res.json({ message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete post.' });
  }
});

module.exports = router;
