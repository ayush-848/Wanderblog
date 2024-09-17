require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
connectDB();

app.use(express.static(path.join(__dirname, '../frontend/dist')));




// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});