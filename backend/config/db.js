const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  if (process.env.VERCEL && !process.env.MONGO_URI) {
    console.warn('MONGO_URI is missing on Vercel. Skipping database connection.');
    return;
  }

  try {
    // Only set custom DNS locally (bypasses Vercel network DNS restriction)
    if (!process.env.VERCEL) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
      } catch (dnsErr) {
        console.warn('DNS server override failed:', dnsErr.message);
      }
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/social-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (!process.env.VERCEL) {
      process.exit(1);
    } else {
      throw error; // Let the serverless function bubble the connection error instead of crashing the process
    }
  }
};

module.exports = connectDB;
