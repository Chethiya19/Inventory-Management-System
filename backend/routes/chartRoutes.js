const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to get stock for all products
router.get('/product-stock', authMiddleware, chartController.getProductStock);

// Optional: Route to get stock grouped by brand
router.get('/brand-stock', authMiddleware, chartController.getStockByBrand);

// Price range chart data
router.get('/price-ranges', authMiddleware, chartController.getProductsByPriceRange);

// Get products within selected price range
router.get('/price-range', authMiddleware, chartController.getProductsInPriceRange);

module.exports = router;
