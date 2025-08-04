// File: routes/stock.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

router.get('/', brandController.getAllBrands);
router.post('/add', brandController.addBrand);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;