const Product = require('../models/Product');

// Get product stock data
exports.getProductStock = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['name', 'stock_qty']
    });

    res.json(products);
  } catch (err) {
    console.error('Error fetching product stock:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Optional: Get stock grouped by brand
exports.getStockByBrand = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        'brand',
        [Product.sequelize.fn('SUM', Product.sequelize.col('stock_qty')), 'total_stock']
      ],
      group: ['brand']
    });

    res.json(products);
  } catch (err) {
    console.error('Error fetching stock by brand:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
