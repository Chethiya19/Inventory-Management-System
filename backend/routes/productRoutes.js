const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');

// Use multer upload middleware for routes with file upload
router.post('/add', upload.single('image'), productController.addProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
