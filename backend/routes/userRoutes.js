const express = require('express');
const router = express.Router();
const profileService = require('../services/profileService')
const { requireAuth } = require('@clerk/express')


router.get('/profile', requireAuth(), profileService.getProfile);
router.put('/profile', requireAuth(), profileService.updateProfile);

module.exports = router;