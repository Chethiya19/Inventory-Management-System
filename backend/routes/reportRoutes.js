const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/stock-history', authMiddleware, reportController.getStockHistoryReport);
router.get('/stock-history/pdf', authMiddleware, reportController.downloadStockHistoryPDF);

module.exports = router;
