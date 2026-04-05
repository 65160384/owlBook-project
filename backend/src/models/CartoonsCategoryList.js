const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CartoonCategory = require('./CartoonCategory');
const Cartoon = require('./Cartoon');
const CartoonsCategoryList = sequelize.define('CartoonsCategoryList', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cartoon_categories_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: CartoonCategory, key: 'id' } },
  cartoons_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cartoon, key: 'id' } }
}, {
  tableName: 'cartoons_category_lists',
  timestamps: true
});
module.exports = CartoonsCategoryList;
