const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const CartoonEpisode = require('./CartoonEpisode');
const UserCartoonHistory = sequelize.define('UserCartoonHistory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  cartoon_ep_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: CartoonEpisode, key: 'id' } },
  paid_amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
  tableName: 'user_cartoon_histories',
  timestamps: true
});
module.exports = UserCartoonHistory;
