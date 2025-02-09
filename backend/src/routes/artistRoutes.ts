import express from 'express';
import {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} from '../controllers/artistController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
/**
 * @swagger
 * /artists:
 *   post:
 *     summary: Create a new artist
 *     tags: [Artists]
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
 *             example:
 *               name: Angra
 *     responses:
 *       201:
 *         description: Artist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/artists', authMiddleware, createArtist);

/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Get all artists
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all artists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/artists', authMiddleware, getAllArtists);

/**
 * @swagger
 * /artists/{id}:
 *   get:
 *     summary: Get an artist by ID
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The artist ID
 *     responses:
 *       200:
 *         description: Artist found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Artist not found
 *       500:
 *         description: Internal server error
 */
router.get('/artists/:id', authMiddleware, getArtistById);

/**
 * @swagger
 * /artists/{id}:
 *   put:
 *     summary: Update an artist by ID
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The artist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Updated Artist Name
 *     responses:
 *       200:
 *         description: Artist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Artist not found
 *       500:
 *         description: Internal server error
 */
router.put('/artists/:id', authMiddleware, updateArtist);

/**
 * @swagger
 * /artists/{id}:
 *   delete:
 *     summary: Delete an artist by ID
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The artist ID
 *     responses:
 *       204:
 *         description: Artist deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Artist not found
 *       500:
 *         description: Internal server error
 */
router.delete('/artists/:id', authMiddleware, deleteArtist);

export default router;