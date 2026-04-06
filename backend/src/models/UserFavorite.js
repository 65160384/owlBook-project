const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Cartoon = require('./Cartoon');
const UserFavorite = sequelize.define('UserFavorite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  cartoons_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cartoon, key: 'id' } },
}, {
  tableName: 'user_favourites',
  timestamps: true
});
module.exports = UserFavorite;
