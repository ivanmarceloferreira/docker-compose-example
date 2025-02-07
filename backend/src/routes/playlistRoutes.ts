import express from 'express';
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  addMusicsToPlaylist,
  removeMusicsFromPlaylist,
  deletePlaylist,
} from '../controllers/playlistController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Create a playlist
router.post('/playlists', authMiddleware, createPlaylist);

// Get all playlists
router.get('/playlists', authMiddleware, getAllPlaylists);

// Get a playlist by ID
router.get('/playlists/:id', authMiddleware, getPlaylistById);

// Add musics to a playlist
router.post('/playlists/:id/musics', authMiddleware, addMusicsToPlaylist);

// Remove musics from a playlist
router.delete('/playlists/:id/musics', authMiddleware, removeMusicsFromPlaylist);

// Delete a playlist
router.delete('/playlists/:id', authMiddleware, deletePlaylist);

export default router;