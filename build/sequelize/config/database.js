import { Sequelize } from 'sequelize';
// Ensure `env` is one of the expected keys
const env = process.env.NODE_ENV || 'development';
import dbConfig from 'config';
const config = dbConfig[env];
const sequelize = new Sequelize(config);
export default sequelize;
