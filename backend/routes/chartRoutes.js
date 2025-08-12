const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to get stock for all products
router.get('/product-stock', authMiddleware, chartController.getProductStock);

// Optional: Route to get stock grouped by brand
router.get('/brand-stock', authMiddleware, chartController.getStockByBrand);

module.exports = router;
