require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const userRoutes = require('./routes/userRoutes.js');
const blogsRoutes = require('./routes/blogsRoutes.js');
const path = require('path');
const fs = require("fs/promises");


// Import Clerk's Express middleware
const { clerkMiddleware } = require('@clerk/express');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connected successfully.');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Configure CORS
const allowedOrigins = [
  'https://www.wanderblog.xyz',
  'https://wanderblog-ayush-debs-projects.vercel.app',
  'http://localhost:3000',    // Ensure localhost is included
  'https://vocal-rat-28.clerk.accounts.dev',
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

app.options('*', cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true, 
  })
);

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
});


// Serve static files (uploads and frontend dist folder)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

//clerk middleware
app.use(clerkMiddleware())

// API Routes
app.use('/users', userRoutes);
app.use('/blogs', blogsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: true, message: err.message });
});


// Catch-all route for frontend (should be at the bottom)
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
