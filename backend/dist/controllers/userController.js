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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
// Create a User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ error: 'Name, email, and password are required' });
        }
        const user = yield UserModel_1.default.create({ name, email, password });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});
exports.createUser = createUser;
// Get All Users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});
exports.getAllUsers = getAllUsers;
// Get a Single User by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});
exports.getUserById = getUserById;
// Update a User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email) {
            return res
                .status(400)
                .json({ error: 'Name and email are required' });
        }
        const user = yield UserModel_1.default.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = name;
        user.email = email;
        if (password) {
            user.password = password; // Password will be hashed automatically by the model hook
        }
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});
exports.updateUser = updateUser;
// Delete a User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        yield user.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});
exports.deleteUser = deleteUser;
