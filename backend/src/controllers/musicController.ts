import { Request, Response } from 'express';
import MusicModel from '../models/MusicModel';
import ArtistModel from '../models/ArtistModel';
import GenderModel from '../models/GenderModel';

// Create a Music
export const createMusic = async (req: Request, res: Response) => {
    try {
        const { name, artistId, genderId } = req.body;
        if (!name || !artistId || !genderId) {
            return res
                .status(400)
                .json({ error: 'Name, artistId, and genderId are required' });
        }

        const music = await MusicModel.create({ name, artistId, genderId });
        res.status(201).json(music);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get All Musics
export const getAllMusics = async (req: Request, res: Response) => {
    try {
        const musics = await MusicModel.findAll({
            include: [
                {
                    model: ArtistModel,
                    as: 'artist',
                    attributes: ['id', 'name'],
                },
                {
                    model: GenderModel,
                    as: 'gender',
                    attributes: ['id', 'name'],
                },
            ],
            attributes: ['id', 'name'],
        });
        res.json(musics);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get a Single Music by ID
export const getMusicById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const music = await MusicModel.findByPk(req.params.id);
        if (!music) {
            return res.status(404).json({ error: 'Music not found' });
        }
        res.json(music);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Update a Music
export const updateMusic = async (req: Request, res: Response) => {
    try {
        const { name, artistId, genderId } = req.body;
        if (!name || !artistId || !genderId) {
            return res
                .status(400)
                .json({ error: 'Name, artistId, and genderId are required' });
        }

        const music = await MusicModel.findByPk(req.params.id);
        if (!music) {
            return res.status(404).json({ error: 'Music not found' });
        }

        music.name = name;
        music.artistId = artistId;
        music.genderId = genderId;
        await music.save();

        res.json(music);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
// Delete a Music
export const deleteMusic = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const music = await MusicModel.findByPk(req.params.id);
        if (!music) {
            return res.status(404).json({ error: 'Music not found' });
        }

        await music.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

export const getMusicsByArtist = async (req: Request, res: Response) => {
    try {
        const { artistId } = req.params;

        // Find all musics by artistId
        const musics = await MusicModel.findAll({
            where: { artistId },
            include: [
                {
                    model: ArtistModel,
                    as: 'artist',
                },
            ],
        });

        if (musics.length === 0) {
            return res
                .status(404)
                .json({ error: 'No musics found for this artist' });
        }

        res.json(musics);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
