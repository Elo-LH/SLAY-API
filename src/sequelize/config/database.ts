import { Sequelize, Options } from 'sequelize'

// Define the type for the environment keys
type Env = 'development' | 'test' | 'production'

// Ensure `env` is one of the expected keys
const env: Env = (process.env.NODE_ENV as Env) || 'development'

import dbConfig from 'config'
const config: Options = dbConfig[env]
const sequelize = new Sequelize(config)

export default sequelize
