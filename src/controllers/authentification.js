import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req, res, next) => {
  const token = await req.header('authentication');
  if (!token) return res.status(401).json({error: 'Access denied'});

  try {
    const verified = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({error: 'invalid token'});
  }
};
