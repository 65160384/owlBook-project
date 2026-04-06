const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  users_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  srcid: { type: DataTypes.STRING(45), allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.TINYINT, allowNull: false, comment: '0=pending,1=paid,2=failed' },
}, {
  tableName: 'payments',
  timestamps: true
});
module.exports = Payment;
