"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_js_1 = __importDefault(require("./config.js"));
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
const options = config_js_1.default[env];
const sequelize = new sequelize_typescript_1.Sequelize(options);
console.log(Object.getOwnPropertyNames(sequelize));
exports.default = sequelize;
