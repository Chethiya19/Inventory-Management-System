// File: routes/stock.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/', stockController.getAllStock);
router.post('/in', stockController.stockIn);
router.post('/out', stockController.stockOut);
router.get('/alerts', stockController.getLowStockAlerts);

module.exports = router;