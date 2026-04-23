import { Router } from 'express';
import Event from '../models/Event.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.use(auth);

router.get('/', async (_req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1, createdAt: -1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, date, type, notes, attendees = ['all'] } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: 'title and date are required' });
    }

    const created = await Event.create({
      title,
      date,
      type,
      notes,
      attendees,
      createdBy: req.user.id
    });

    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
});

export default router;
