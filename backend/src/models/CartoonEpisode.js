const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cartoon = require('./Cartoon');
const CartoonEpisode = sequelize.define('CartoonEpisode', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cartoon_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cartoon, key: 'id' } },
  number: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(45), allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
  tableName: 'cartoon_episodes',
  timestamps: true
});
module.exports = CartoonEpisode;
