"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_js_1 = __importDefault(require("../controller/authController.js"));
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.route('/signup').post(authController_js_1.default);
exports.default = authRouter;
