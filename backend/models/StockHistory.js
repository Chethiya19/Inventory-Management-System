// File: models/StockHistory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust path if needed

const StockHistory = sequelize.define('StockHistory', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', // matches the actual table name
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  type: {
    type: DataTypes.ENUM('in', 'out'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true, // createdAt and updatedAt
  tableName: 'StockHistories'
});

module.exports = StockHistory;
