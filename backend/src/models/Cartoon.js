const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cartoon = sequelize.define('Cartoon', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'cartoons',
  timestamps: true
});
module.exports = Cartoon;
