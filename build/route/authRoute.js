"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_js_1 = require("../controller/authController.js");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.route('/signup').post(authController_js_1.signup);
authRouter.route('/login').post(authController_js_1.login);
authRouter.route('/slayers').post(authController_js_1.slayers);
exports.default = authRouter;
