const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/stock-history', reportController.getStockHistoryReport);

module.exports = router;
