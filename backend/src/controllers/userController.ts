import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

// Create a User
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ error: 'Name, email, and password are required' });
        }

        const user = await UserModel.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get a Single User by ID
export const getUserById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Update a User
export const updateUser = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email) {
            return res
                .status(400)
                .json({ error: 'Name and email are required' });
        }

        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name;
        user.email = email;
        if (password) {
            user.password = password; // Password will be hashed automatically by the model hook
        }
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Delete a User
export const deleteUser = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
