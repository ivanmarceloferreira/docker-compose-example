import express from 'express';
import {
  createGender,
  getAllGenders,
  getGenderById,
  updateGender,
  deleteGender,
} from '../controllers/genderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
/**
 * @swagger
 * /genders:
 *   post:
 *     summary: Create a new gender
 *     tags: [Genders]
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
 *               name: Power metal
 *     responses:
 *       201:
 *         description: Gender created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gender'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/genders', authMiddleware, createGender);

/**
 * @swagger
 * /genders:
 *   get:
 *     summary: Get all genders
 *     tags: [Genders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all genderss
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gender'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/genders', authMiddleware, getAllGenders);

/**
 * @swagger
 * /genders/{id}:
 *   get:
 *     summary: Get an gender by ID
 *     tags: [Genders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The gender ID
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
router.get('/genders/:id', authMiddleware, getGenderById);

/**
 * @swagger
 * /genders/{id}:
 *   put:
 *     summary: Update an gender by ID
 *     tags: [Genders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The gender ID
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
router.put('/genders/:id', authMiddleware, updateGender);

/**
 * @swagger
 * /genders/{id}:
 *   delete:
 *     summary: Delete an gender by ID
 *     tags: [Genders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The gender ID
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
router.delete('/genders/:id', authMiddleware, deleteGender);

export default router;