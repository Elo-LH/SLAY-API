import { Options } from 'sequelize'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import dbConfig from './config.js'

// Define the type for the environment keys
type Env = 'development' | 'test' | 'production'

// Ensure `env` is one of the expected keys
const env: Env = (process.env.NODE_ENV as Env) || 'development'

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

const options: SequelizeOptions = dbConfig[env]
const sequelize = new Sequelize(options)

console.log(Object.getOwnPropertyNames(sequelize))
export default sequelize
