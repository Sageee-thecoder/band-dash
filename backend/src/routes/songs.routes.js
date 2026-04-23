import { Router } from 'express';
import Song from '../models/Song.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.use(auth);

router.get('/', async (_req, res, next) => {
  try {
    res.json(await Song.find().sort({ updatedAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Song.create(req.body));
  } catch (err) {
    next(err);
  }
});

export default router;
