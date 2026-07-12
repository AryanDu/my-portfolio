const mongoose = require('mongoose');
const dns = require('dns');

// On some Windows setups, the system DNS resolver fails to look up
// MongoDB Atlas's SRV records even though the internet connection is fine.
// Forcing Node to use Google's public DNS fixes it reliably.
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not set in your .env file');
    }
    await mongoose.connect(uri);
    console.log('✓ MongoDB connected');
  } catch (err) {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;