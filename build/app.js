// Get dotenv file infos from current working directory (works anywhere)
// require('dotenv').config({ path: `${process.cwd()}/.env` })
import { config } from 'dotenv';
import { resolve } from 'path';
import bodyParser from 'body-parser';
// Configure dotenv
config({ path: resolve(process.cwd(), '.env') });
import express from 'express';
import sequelize from './sequelize/config/database.js';
// import authRouter from './route/authRoute.js'
const app = express();
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
async function assertDatabaseConnection() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    }
    catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}
async function init() {
    await assertDatabaseConnection();
    console.log(`Starting API on port ${PORT}...`);
    app.listen(PORT, () => {
        console.log(`API started and listening on port ${PORT}.`);
    });
}
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Authentification routes
// app.use('/api/v1/auth', authRouter)
// Default not found route
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found',
    });
});
const PORT = process.env.APP_PORT || 3000;
init();
export default app;
