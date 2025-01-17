"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        if (process.env.JWT_ACCESS) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS);
            req.body.token = decoded;
            console.log(decoded);
        }
        next();
    }
    catch (err) {
        res.status(401).send('Please authenticate');
    }
};
exports.auth = auth;
