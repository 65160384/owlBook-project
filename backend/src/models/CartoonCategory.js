const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CartoonCategory = sequelize.define('CartoonCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(45), allowNull: false, unique: true },
}, {
  tableName: 'cartoon_categories',
  timestamps: true
});
module.exports = CartoonCategory;
