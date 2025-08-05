const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Route Example
router.get('/profile', authMiddleware, async (req, res) => {
  // You can fetch and return user info using req.userId
  res.json({ message: 'Protected route accessed', userId: req.userId });
});

// Logout
router.post('/logout', authController.logout);

// Change Password (Protected)
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
