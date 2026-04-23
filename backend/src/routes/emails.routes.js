import { Router } from 'express';
import Email from '../models/Email.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.use(auth);

router.get('/', async (_req, res, next) => {
  try {
    res.json(await Email.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Email.create(req.body));
  } catch (err) {
    next(err);
  }
});

export default router;
