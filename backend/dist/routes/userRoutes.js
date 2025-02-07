"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Public routes
router.post('/users', userController_1.createUser);
// Protected routes
router.get('/users', authMiddleware_1.authMiddleware, userController_1.getAllUsers);
router.get('/users/:id', authMiddleware_1.authMiddleware, userController_1.getUserById);
router.put('/users/:id', authMiddleware_1.authMiddleware, userController_1.updateUser);
router.delete('/users/:id', authMiddleware_1.authMiddleware, userController_1.deleteUser);
exports.default = router;
