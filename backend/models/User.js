// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true }, // Clerk user ID
  email: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  profileImageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;