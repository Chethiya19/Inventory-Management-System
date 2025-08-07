const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/stock-history', reportController.getStockHistoryReport);
router.get('/stock-history/pdf', reportController.downloadStockHistoryPDF);

module.exports = router;
