const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middlewares/authMiddleware'); // Your JWT auth middleware

// Protect this route to authenticated users
router.post('/change-password', authMiddleware, settingsController.changePassword);

module.exports = router;
