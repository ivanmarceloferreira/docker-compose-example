import jwt from 'jsonwebtoken';

const JWT_SECRET = 'aula-backend-node-2025'; // Replace with a strong secret key
const JWT_EXPIRES_IN = '1h'; // Token expiration time

// Generate a JWT token
export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify a JWT token
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};