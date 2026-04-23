import { Router } from 'express';
import Subscriber from '../models/Subscriber.js';
import { auth } from '../middleware/auth.js';
import { roles } from '../middleware/roles.js';

const router = Router();
router.use(auth, roles('manager', 'admin'));

router.get('/', async (_req, res, next) => {
  try {
    const subscribers = await Subscriber.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { email, name, tier } = req.body;
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: email?.toLowerCase().trim() },
      { email: email?.toLowerCase().trim(), name, tier, isActive: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(subscriber);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/deactivate', async (req, res, next) => {
  try {
    const updated = await Subscriber.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Subscriber not found' });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

export default router;
