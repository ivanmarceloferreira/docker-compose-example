import express, { Request, Response } from 'express';
import sequelize from './config/database';

import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';

// Sync the model with the database
sequelize
    .sync()
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/auth', loginRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
