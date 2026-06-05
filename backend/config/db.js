const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  const isServerless = !!(process.env.VERCEL || process.env.NETLIFY);

  if (isServerless && !process.env.MONGO_URI) {
    console.warn('MONGO_URI is missing in serverless environment. Skipping database connection.');
    return;
  }

  // If already connected or connecting, skip
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return;
  }

  try {
    // Only set custom DNS locally (bypasses network DNS restrictions, do not run in production serverless)
    if (!isServerless) {
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
    if (!isServerless) {
      process.exit(1);
    } else {
      throw error; // Let the serverless function bubble the connection error instead of crashing the process
    }
  }
};

module.exports = connectDB;
