const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/change-password', authMiddleware, settingsController.changePassword);

module.exports = router;
