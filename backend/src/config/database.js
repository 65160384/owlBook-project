const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use in-memory sqlite for tests to avoid requiring a running MySQL server.
if (process.env.NODE_ENV === 'test') {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  module.exports = sequelize;
} else {
  const sequelize = new Sequelize(
    process.env.DB_NAME || 'mydb',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false,
    }
  );
  module.exports = sequelize;
}
