const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Cartoon = require('./Cartoon');
const AuthorCartoon = sequelize.define('AuthorCartoon', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  users_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  cartoons_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cartoon, key: 'id' } }
}, {
  tableName: 'author_cartoon',
  timestamps: true
});
module.exports = AuthorCartoon;
