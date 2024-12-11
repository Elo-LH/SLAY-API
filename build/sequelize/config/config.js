import { config } from 'dotenv';
import { resolve } from 'path';
// Configure dotenv
config({ path: resolve(process.cwd(), '.env') });
const dbConfig = {
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
};
export default dbConfig;
