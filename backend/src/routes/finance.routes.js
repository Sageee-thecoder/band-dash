import { Router } from 'express';
import Revenue from '../models/Revenue.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.use(auth);

router.get('/', async (_req, res, next) => {
  try {
    res.json(await Revenue.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Revenue.create(req.body));
  } catch (err) {
    next(err);
  }
});

export default router;
