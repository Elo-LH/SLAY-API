import { Sequelize } from 'sequelize';
import dbConfig from './config.js';
// Ensure `env` is one of the expected keys
const env = process.env.NODE_ENV || 'development';
const options = dbConfig[env];
const sequelize = new Sequelize(options);
export default sequelize;
