const { Op } = require('sequelize');
const Product = require('../models/Product');
const StockHistory = require('../models/StockHistory');

exports.getAllStock = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

exports.stockIn = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid productId or quantity' });
    }

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.stock_qty += quantity;
    await product.save();

    await StockHistory.create({ productId, type: 'in', quantity });

    res.status(200).json({ message: 'Stock added successfully', updatedStock: product.stock_qty });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add stock', details: error.message });
  }
};

exports.stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid productId or quantity' });
    }

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.stock_qty < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    product.stock_qty -= quantity;
    await product.save();

    await StockHistory.create({ productId, type: 'out', quantity });

    res.status(200).json({ message: 'Stock removed successfully', updatedStock: product.stock_qty });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove stock', details: error.message });
  }
};

exports.getLowStockAlerts = async (req, res) => {
  try {
    const threshold = 5;
    const lowStock = await Product.findAll({
      where: { stock_qty: { [Op.lte]: threshold } }
    });

    res.status(200).json(lowStock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch low stock alerts', details: error.message });
  }
};
