const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, stockController.getAllStock);
router.post('/in', authMiddleware, stockController.stockIn);
router.post('/out', authMiddleware, stockController.stockOut);
router.get('/alerts', authMiddleware, stockController.getLowStockAlerts);
router.get('/history/in', authMiddleware, stockController.getStockInHistory);
router.get('/history/out', authMiddleware, stockController.getStockOutHistory);


module.exports = router;