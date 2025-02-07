import { Request, Response } from 'express';
import GenderModel from '../models/GenderModel';

// Create a Gender
export const createGender = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ error: 'Name is required' });
        }

        const gender = await GenderModel.create({ name });
        res.status(201).json(gender);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get All Genders
export const getAllGenders = async (req: Request, res: Response) => {
    try {
        const genders = await GenderModel.findAll();
        res.json(genders);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get a Single Gender by ID
export const getGenderById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const gender = await GenderModel.findByPk(req.params.id);
        if (!gender) {
            return res.status(404).json({ error: 'Gender not found' });
        }
        res.json(gender);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Update a Gender
export const updateGender = async (
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

        const gender = await GenderModel.findByPk(req.params.id);
        if (!gender) {
            return res.status(404).json({ error: 'Gender not found' });
        }

        gender.name = name;
        await gender.save();

        res.json(gender);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Delete a Gender
export const deleteGender = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const gender = await GenderModel.findByPk(req.params.id);
        if (!gender) {
            return res.status(404).json({ error: 'Gender not found' });
        }

        await gender.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
