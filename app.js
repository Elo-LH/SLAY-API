// Get dotenv file infos from current working directory (works anywhere)
require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require('express')
const app = express()
const PORT = process.env.APP_PORT || 3000

const authRouter = require('./route/authRoute')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Authentification routes

app.use('/api/v1/auth', authRouter)
app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  })
})

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
