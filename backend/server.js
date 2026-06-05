require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Static Files (Image uploads)
const uploadDir = (process.env.NETLIFY || process.env.VERCEL)
  ? '/tmp/uploads'
  : path.join(__dirname, 'public/uploads');
app.use('/uploads', express.static(uploadDir));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const mongoose = require('mongoose');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: {
      connected: mongoose.connection.readyState === 1,
      state: mongoose.connection.readyState, // 0 = disconnected, 1 = connected, 2 = connecting
      uriDefined: !!process.env.MONGO_URI,
    },
    env: {
      nodeEnv: process.env.NODE_ENV,
      vercel: process.env.VERCEL,
    }
  });
});

// Root endpoint status check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API is running successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

if (!process.env.NETLIFY && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;

