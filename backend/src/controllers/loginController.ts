import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { generateToken } from '../utils/jwt';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: 'Email and password are required' });
        }

        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = generateToken(user.id!);

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
