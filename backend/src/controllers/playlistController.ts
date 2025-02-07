import { Request, Response } from 'express';
import PlaylistModel from '../models/PlaylistModel';
import MusicModel from '../models/MusicModel';
import ArtistModel from '../models/ArtistModel';

// Create a playlist
export const createPlaylist = async (req: Request, res: Response) => {
    try {
        const { name, musicIds } = req.body;
        if (!name || !musicIds || !Array.isArray(musicIds)) {
            return res
                .status(400)
                .json({ error: 'Name and musicIds are required' });
        }

        const playlist = await PlaylistModel.create({ name });

        // Add musics to the playlist
        await playlist.addMusics(musicIds);

        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get all playlists
export const getAllPlaylists = async (req: Request, res: Response) => {
    try {
        const playlists = await PlaylistModel.findAll({
            include: [
                {
                    model: MusicModel,
                    as: 'musics',
                    through: { attributes: [] }, // Exclude join table attributes
                    include: [
                        {
                            model: ArtistModel,
                            as: 'artist',
                            attributes: ['id', 'name'],
                        },
                    ],
                    attributes: ['id', 'name'],
                },
            ],
        });
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get a playlist by ID
export const getPlaylistById = async (req: Request, res: Response) => {
    try {
        const playlist = await PlaylistModel.findByPk(req.params.id, {
            include: [
                {
                    model: MusicModel,
                    as: 'musics',
                },
            ],
        });
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Add musics to a playlist
export const addMusicsToPlaylist = async (req: Request, res: Response) => {
    try {
        const { musicIds } = req.body;
        if (!musicIds || !Array.isArray(musicIds)) {
            return res.status(400).json({ error: 'musicIds are required' });
        }

        const playlist = await PlaylistModel.findByPk(req.params.id);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Add musics to the playlist
        await playlist.addMusics(musicIds);

        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Remove musics from a playlist
export const removeMusicsFromPlaylist = async (req: Request, res: Response) => {
    try {
        const { musicIds } = req.body;
        if (!musicIds || !Array.isArray(musicIds)) {
            return res.status(400).json({ error: 'musicIds are required' });
        }

        const playlist = await PlaylistModel.findByPk(req.params.id);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Remove musics from the playlist
        await playlist.removeMusics(musicIds);

        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Delete a playlist
export const deletePlaylist = async (req: Request, res: Response) => {
    try {
        const playlist = await PlaylistModel.findByPk(req.params.id);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        await playlist.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
