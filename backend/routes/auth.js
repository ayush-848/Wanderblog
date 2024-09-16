// backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Assuming User model is inside ../models/User
const router = express.Router();
require('dotenv').config();

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Multer setup to store profile pictures in 'uploads/' folder
const storage = multer.diskStorage({
  destination: './uploads', // Ensure 'uploads' folder exists in the root of 'backend'
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // limit file size to 1MB
}).single('profilePic');

// User registration (with profile picture)
router.post('/register', upload, async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user with profile picture (if uploaded)
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      profilePic: req.file ? req.file.filename : null, // Storing filename of the uploaded picture
    });

    // Save the new user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
