const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  try {
    // Force Node.js to use Google DNS for resolving Atlas cluster SRV records
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/social-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
