const { Op } = require('sequelize');
const Product = require('../models/Product');
const StockHistory = require('../models/StockHistory');

// GET /api/reports/stock-history?type=in&start=2025-08-01&end=2025-08-06
exports.getStockHistoryReport = async (req, res) => {
  const { type, start, end } = req.query;

  try {
    const records = await StockHistory.findAll({
      where: {
        type: type || { [Op.in]: ['in', 'out'] },
        createdAt: {
          [Op.between]: [new Date(start), new Date(end)]
        }
      },
      include: [{ model: Product }],
      order: [['createdAt', 'ASC']]
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stock history', error });
  }
};
