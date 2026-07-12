const express = require('express');
const Project = require('../models/Project');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// GET /api/projects - public, anyone can view
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Could not load projects.' });
  }
});

// POST /api/projects - admin only
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, githubUrl, liveUrl, tags, order } = req.body;
    if (!title || !description || !githubUrl) {
      return res.status(400).json({ error: 'Title, description, and GitHub URL are required.' });
    }
    const project = await Project.create({ title, description, githubUrl, liveUrl, tags, order });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Could not create project.' });
  }
});

// PUT /api/projects/:id - admin only
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Project not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not update project.' });
  }
});

// DELETE /api/projects/:id - admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found.' });
    res.json({ message: 'Project deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete project.' });
  }
});

module.exports = router;
