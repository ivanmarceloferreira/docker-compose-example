"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res
            .status(401)
            .json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded; // Attach the decoded user to the request object
        next();
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};
exports.authMiddleware = authMiddleware;
