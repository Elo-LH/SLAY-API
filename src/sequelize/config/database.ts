import { Sequelize, Options } from 'sequelize'
import dbConfig from './config.js'

// Define the type for the environment keys
type Env = 'development' | 'test' | 'production'

// Ensure `env` is one of the expected keys
const env: Env = (process.env.NODE_ENV as Env) || 'development'

const options: Options = dbConfig[env]
const sequelize = new Sequelize(options)

export default sequelize
