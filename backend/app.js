const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connected successfully.');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
});

// Configure CORS
const allowedOrigins = [
  'https://www.wanderblog.xyz',
  'https://wanderblog-ayush-debs-projects.vercel.app',
  'http://localhost:3000',    // Ensure localhost is included
  process.env.FRONT_END_URL
];



app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Middleware
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Catch-all route for frontend
app.get('*', (req, res) => {
  console.log(`Serving static file for ${req.url}`);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Server Error');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
