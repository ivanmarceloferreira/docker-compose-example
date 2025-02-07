"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
// Sync the model with the database
database_1.default
    .sync()
    .then(() => {
    console.log('Database synced successfully!');
})
    .catch((error) => {
    console.error('Error syncing database:', error);
});
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Routes
app.use('/api', userRoutes_1.default);
app.use('/auth', loginRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
