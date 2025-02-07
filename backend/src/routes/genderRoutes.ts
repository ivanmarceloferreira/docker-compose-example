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
router.post('/genders', authMiddleware, createGender);
router.get('/genders', authMiddleware, getAllGenders);
router.get('/genders/:id', authMiddleware, getGenderById);
router.put('/genders/:id', authMiddleware, updateGender);
router.delete('/genders/:id', authMiddleware, deleteGender);

export default router;