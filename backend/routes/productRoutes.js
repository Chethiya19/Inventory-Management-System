const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/authMiddleware');

// Use multer upload middleware for routes with file upload
router.post('/add', upload.single('image'), authMiddleware, productController.addProduct);
router.put('/:id', upload.single('image'), authMiddleware, productController.updateProduct);

router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:id', authMiddleware, productController.getProductById);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
