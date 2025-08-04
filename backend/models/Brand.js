const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Brand = sequelize.define('Brand', {
  brandID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'brands',
});

module.exports = Brand;
