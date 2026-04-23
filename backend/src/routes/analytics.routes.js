import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Deal from '../models/Deal.js';
import Song from '../models/Song.js';
import Revenue from '../models/Revenue.js';

const router = Router();
router.use(auth);

router.get('/summary', async (_req, res, next) => {
  try {
    const [deals, songs, revenue] = await Promise.all([
      Deal.countDocuments(),
      Song.countDocuments(),
      Revenue.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }])
    ]);

    res.json({
      deals,
      songs,
      revenue: revenue[0]?.total || 0
    });
  } catch (err) {
    next(err);
  }
});

export default router;
