const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    content: { type: String, required: true },
    imageUrls: { type: [String], default: [] }, // Google Drive / Imgur links etc.
    category: { type: String, enum: ['travel', 'gym', 'other'], default: 'travel' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', blogPostSchema);
