const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const statsController = require('../controllers/statsController');

router.get('/counts', authMiddleware, statsController.getCounts);

module.exports = router;
