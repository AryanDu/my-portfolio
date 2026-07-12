const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Ensures exactly one admin account exists, matching whatever is in .env.
// Safe to run every time the server starts - it only creates/updates as needed.
async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.warn('⚠ ADMIN_USERNAME / ADMIN_PASSWORD not set - admin login will not work until you set them in .env');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const existing = await Admin.findOne({ username });

  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
  } else {
    await Admin.create({ username, passwordHash });
  }
  console.log(`✓ Admin account ready for user "${username}"`);
}

module.exports = seedAdmin;
