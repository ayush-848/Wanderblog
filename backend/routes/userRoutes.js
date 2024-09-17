const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const auth = require('../middlewares/auth');

router.post('/register', authService.register);
router.post('/login', authService.login);
router.get('/profile', auth, authService.getProfile);
router.put('/profile', auth, authService.updateProfile);

module.exports = router;