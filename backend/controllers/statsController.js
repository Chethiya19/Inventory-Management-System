const Product = require('../models/Product');
const Brand = require('../models/Brand');

exports.getCounts = async (req, res) => {
  try {
    const productCount = await Product.count();
    const brandCount = await Brand.count();

    res.json({
      products: productCount,
      brands: brandCount
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
};
