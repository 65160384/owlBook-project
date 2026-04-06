const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING(45), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(128), allowNull: false },
  roles_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Role, key: 'id' } },
  coin: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
  tableName: 'users',
  timestamps: true
});
module.exports = User;
