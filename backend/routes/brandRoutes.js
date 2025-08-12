// File: routes/stock.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, brandController.getAllBrands);
router.post('/add', authMiddleware, brandController.addBrand);
router.put('/:id', authMiddleware, brandController.updateBrand);
router.delete('/:id', authMiddleware, brandController.deleteBrand);

module.exports = router;