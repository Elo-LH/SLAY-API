// Get dotenv file infos from current working directory (works anywhere)
require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require('express')
const sequelize = require('./sequelize/config/database')
const authRouter = require('./route/authRoute')

const app = express()

async function assertDatabaseConnection() {
  console.log(`Checking database connection...`)
  try {
    await sequelize.authenticate()
    console.log('Database connection OK!')
  } catch (error) {
    console.log('Unable to connect to the database:')
    console.log(error.message)
    process.exit(1)
  }
}

async function init() {
  await assertDatabaseConnection()

  console.log(`Starting API on port ${PORT}...`)

  app.listen(PORT, () => {
    console.log(`API started and listening on port ${PORT}.`)
  })
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Authentification routes

app.use('/api/v1/auth', authRouter)

// Default not found route
app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  })
})

const PORT = process.env.APP_PORT || 3000

init()
