const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, brand, model, storage, color, price, stock_qty } = req.body;

    // Use original filename from multer upload
    const image = req.file ? req.file.originalname : null;

    const product = await Product.create({
      name,
      brand,
      model,
      storage,
      color,
      price,
      stock_qty,
      image
    });

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, brand, model, storage, color, price, stock_qty } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let image = product.image; // keep existing image by default

    if (req.file) {
      // Delete old image file if exists
      if (image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', 'products', image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      image = req.file.originalname; // new uploaded image filename
    }

    await product.update({ name, brand, model, storage, color, price, stock_qty, image });

    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Delete associated image file if exists
    if (product.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', 'products', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
