import { Router } from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { roles } from '../middleware/roles.js';

const router = Router();

router.get('/', auth, roles('manager', 'admin'), async (_req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

export default router;
