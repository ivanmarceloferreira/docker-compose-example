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

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               musicIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               name: My Playlist
 *               musicIds: [1, 2]
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/playlists', authMiddleware, createPlaylist);

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Get all playlists
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/playlists', authMiddleware, getAllPlaylists);

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     summary: Get a playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The playlist ID
 *     responses:
 *       200:
 *         description: Playlist found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Internal server error
 */
router.get('/playlists/:id', authMiddleware, getPlaylistById);

/**
 * @swagger
 * /playlists/{id}/musics:
 *   post:
 *     summary: Add musics to a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               musicIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               musicIds: [3, 4]
 *     responses:
 *       200:
 *         description: Musics added to the playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Internal server error
 */
router.post('/playlists/:id/musics', authMiddleware, addMusicsToPlaylist);

/**
 * @swagger
 * /playlists/{id}/musics:
 *   delete:
 *     summary: Remove musics from a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               musicIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               musicIds: [3, 4]
 *     responses:
 *       200:
 *         description: Musics removed from the playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Internal server error
 */
router.delete('/playlists/:id/musics', authMiddleware, removeMusicsFromPlaylist);

/**
 * @swagger
 * /playlists/{id}:
 *   delete:
 *     summary: Delete a playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The playlist ID
 *     responses:
 *       204:
 *         description: Playlist deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Internal server error
 */
router.delete('/playlists/:id', authMiddleware, deletePlaylist);

export default router;