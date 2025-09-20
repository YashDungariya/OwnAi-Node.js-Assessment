require('dotenv').config();
const { DataSource } = require('typeorm');
const User = require('./entities/User');

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Yash@123',
  database: process.env.DB_NAME || 'OwnAi_Server',
  synchronize: false, // DEV: auto create tables. For production use migrations.
  logging: ['query', 'error'],
  entities: [ User ],
});

module.exports = AppDataSource;
