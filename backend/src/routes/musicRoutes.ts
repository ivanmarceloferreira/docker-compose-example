import express from 'express';
import {
    createMusic,
    getAllMusics,
    getMusicById,
    getMusicsByArtist,
    updateMusic,
    deleteMusic,
} from '../controllers/musicController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
/**
 * @swagger
 * /musics:
 *   post:
 *     summary: Create a new music
 *     tags: [Musics]
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
 *               artistId:
 *                 type: integer
 *             example:
 *               name: Song 1
 *               artistId: 1
 *     responses:
 *       201:
 *         description: Music created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Music'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/musics', authMiddleware, createMusic);

/**
 * @swagger
 * /musics:
 *   get:
 *     summary: Get all musics
 *     tags: [Musics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all musics with associated artist details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Music'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/musics', authMiddleware, getAllMusics);

/**
 * @swagger
 * /musics/{id}:
 *   get:
 *     summary: Get a music by ID
 *     tags: [Musics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The music ID
 *     responses:
 *       200:
 *         description: Music found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Music'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Music not found
 *       500:
 *         description: Internal server error
 */
router.get('/musics/:id', authMiddleware, getMusicById);

/**
 * @swagger
 * /artists/{artistId}/musics:
 *   get:
 *     summary: Get all musics by artist ID
 *     tags: [Musics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: artistId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the artist
 *     responses:
 *       200:
 *         description: List of musics by the specified artist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Music'
 *       404:
 *         description: No musics found for this artist
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/artists/:artistId/musics', authMiddleware, getMusicsByArtist);

/**
 * @swagger
 * /musics/{id}:
 *   put:
 *     summary: Update a music by ID
 *     tags: [Musics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The music ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               artistId:
 *                 type: integer
 *             example:
 *               name: Updated Song 1
 *               artistId: 2
 *     responses:
 *       200:
 *         description: Music updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Music'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Music not found
 *       500:
 *         description: Internal server error
 */
router.put('/musics/:id', authMiddleware, updateMusic);

/**
 * @swagger
 * /musics/{id}:
 *   delete:
 *     summary: Delete a music by ID
 *     tags: [Musics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The music ID
 *     responses:
 *       204:
 *         description: Music deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Music not found
 *       500:
 *         description: Internal server error
 */
router.delete('/musics/:id', authMiddleware, deleteMusic);

export default router;
