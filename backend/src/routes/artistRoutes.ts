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
router.post('/artists', authMiddleware, createArtist);
router.get('/artists', authMiddleware, getAllArtists);
router.get('/artists/:id', authMiddleware, getArtistById);
router.put('/artists/:id', authMiddleware, updateArtist);
router.delete('/artists/:id', authMiddleware, deleteArtist);

export default router;