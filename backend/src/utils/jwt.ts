import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

const JWT_SECRET = 'aula-backend-node-2025'; // Replace with a strong secret key
const JWT_EXPIRES_IN = '7d'; // Token expiration time

// Generate a JWT token
export const generateToken = (user: UserModel): string => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify a JWT token
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};