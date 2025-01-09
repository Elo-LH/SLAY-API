"use strict";
// Get dotenv file infos from current working directory (works anywhere)
// require('dotenv').config({ path: `${process.cwd()}/.env` })
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const body_parser_1 = __importDefault(require("body-parser"));
// Configure dotenv
(0, dotenv_1.config)({ path: (0, path_1.resolve)(process.cwd(), '.env') });
const express_1 = __importDefault(require("express"));
const database_js_1 = __importDefault(require("./sequelize/config/database.js"));
const authRoute_js_1 = __importDefault(require("./route/authRoute.js"));
console.log(`Lauching APP.js`);
const app = (0, express_1.default)();
// Use body-parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
async function assertDatabaseConnection() {
    console.log(`Checking database connection...`);
    try {
        await database_js_1.default.authenticate();
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
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Authentification routes
app.use('/api/v1/auth', authRoute_js_1.default);
// Default not found route
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found',
    });
});
const PORT = process.env.APP_PORT || 3000;
init();
exports.default = app;
