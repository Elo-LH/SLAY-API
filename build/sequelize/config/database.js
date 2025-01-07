import { Sequelize } from 'sequelize-typescript';
import dbConfig from './config.js';
// Ensure `env` is one of the expected keys
const env = process.env.NODE_ENV || 'development';
// import fs from 'fs'
// import path from 'path'
// // Get the current working directory
// const currentDirectory = process.cwd()
// // Read the contents of the current working directory
// fs.readdir(currentDirectory, (err, files: Array<String>) => {
//   if (err) {
//     return console.error('Unable to scan directory: ' + err)
//   }
//   // Display the contents of the directory
//   files.forEach((file) => {
//     console.log(file)
//   })
// })
const options = dbConfig[env];
const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    models: [process.cwd() + '/build/sequelize/models'],
});
console.log(Object.getOwnPropertyNames(sequelize));
export default sequelize;
