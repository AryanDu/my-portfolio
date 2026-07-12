const express = require('express');
const Feedback = require('../models/Feedback');

const router = express.Router();

// POST /api/feedback - public, anyone can submit
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    await Feedback.create({ name, email, message });
    res.status(201).json({ message: 'Thanks! Your feedback has been received.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not submit feedback.' });
  }
});

module.exports = router;
