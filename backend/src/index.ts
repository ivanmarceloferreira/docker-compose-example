import express, { Request, Response } from 'express';
import sequelize from './config/database';
import { setupSwagger } from './swagger';
import cors from "cors";
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import musicRoutes from './routes/musicRoutes';
import genderRoutes from './routes/genderRoutes';
import artistRoutes from './routes/artistRoutes';
import playlistRoutes from './routes/playlistRoutes';

// Sync the model with the database
sequelize
    .sync({ alter: true })
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
app.use(cors())
app.use('/auth', loginRoutes);
app.use('/api', userRoutes);
app.use('/api', musicRoutes);
app.use('/api', genderRoutes);
app.use('/api', artistRoutes);
app.use('/api', playlistRoutes);

setupSwagger(app);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});
