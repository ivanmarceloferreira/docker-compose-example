"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jwt_1 = require("../utils/jwt");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: 'Email and password are required' });
        }
        const user = yield UserModel_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isValidPassword = yield user.validatePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // Generate a JWT token
        const token = (0, jwt_1.generateToken)(user.id);
        res.json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});
exports.loginUser = loginUser;
