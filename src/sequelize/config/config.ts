import { config } from 'dotenv'
import { resolve } from 'path'
import { Options } from 'sequelize'

// Define the type for the environment keys
type Env = 'development' | 'test' | 'production'
// Configure dotenv
config({ path: resolve(process.cwd(), '.env') })

const dbConfig: { [key in Env]: Options } = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
}

export default dbConfig
