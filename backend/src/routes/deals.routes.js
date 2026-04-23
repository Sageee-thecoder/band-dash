import { Router } from 'express';
import Deal from '../models/Deal.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.use(auth);

router.get('/', async (_req, res, next) => {
  try {
    res.json(await Deal.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Deal.create(req.body));
  } catch (err) {
    next(err);
  }
});

export default router;
