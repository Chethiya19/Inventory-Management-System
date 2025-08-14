const { Op } = require('sequelize');
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

// Get count of products in predefined price ranges
exports.getProductsByPriceRange = async (req, res) => {
  try {
    const ranges = [
      { label: '< 50000', min: 0, max: 50000 },
      { label: '50000 - 100000', min: 50000, max: 100000 },
      { label: '100000 - 150000', min: 100000, max: 150000 },
      { label: '150000 - 200000', min: 150000, max: 200000 },
      { label: '200000 - 300000', min: 200000, max: 300000 },
      { label: '300000 - 400000', min: 300000, max: 400000 },
      { label: '400000 - 500000', min: 400000, max: 500000 },
      { label: '> 500000', min: 500000, max: Number.MAX_SAFE_INTEGER }
    ];

    const results = await Promise.all(
      ranges.map(async (range) => {
        const count = await Product.count({
          where: {
            price: { [Op.between]: [range.min, range.max] }
          }
        });
        return { range: range.label, count };
      })
    );

    res.json(results);
  } catch (err) {
    console.error('Error fetching products by price range:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get products in a custom price range (query params: min & max)
exports.getProductsInPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;

    if (!min || !max) {
      return res.status(400).json({ message: 'Please provide min and max price values' });
    }

    const products = await Product.findAll({
      where: {
        price: {
          [Op.between]: [Number(min), Number(max)]
        }
      },
      order: [['price', 'ASC']]
    });

    res.json(products);
  } catch (err) {
    console.error('Error fetching products in price range:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};