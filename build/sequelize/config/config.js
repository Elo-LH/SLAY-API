"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
// Configure dotenv
(0, dotenv_1.config)({ path: (0, path_1.resolve)(process.cwd(), '.env') });
const dbConfig = {
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
exports.default = dbConfig;
