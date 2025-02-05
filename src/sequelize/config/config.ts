import { config } from 'dotenv'
import { resolve } from 'path'
import { Options } from 'sequelize'
import { SequelizeOptions } from 'sequelize-typescript'

// Define the type for the environment keys
type Env = 'development' | 'test' | 'production'
// Configure dotenv
config({ path: resolve(process.cwd(), '.env') })

const dbConfig: { [key in Env]: SequelizeOptions } = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    models: [process.cwd() + '/build/sequelize/models'],
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: 'postgres',
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_PROD_HOST,
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    models: [process.cwd() + '/build/sequelize/models'],
  },
}

export default dbConfig
