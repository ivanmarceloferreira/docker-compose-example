import { Request, Response } from 'express';
import ArtistModel from '../models/ArtistModel';

// Create a Artist
export const createArtist = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ error: 'Name is required' });
        }

        const artist = await ArtistModel.create({ name });
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get All Artists
export const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await ArtistModel.findAll();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get a Single Artist by ID
export const getArtistById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const artist = await ArtistModel.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Update a Artist
export const updateArtist = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ error: 'Name is required' });
        }

        const artist = await ArtistModel.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        artist.name = name;
        await artist.save();

        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Delete a Artist
export const deleteArtist = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const artist = await ArtistModel.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        await artist.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
