import { Router } from 'express';
import Newsletter from '../models/Newsletter.js';
import Subscriber from '../models/Subscriber.js';
import { auth } from '../middleware/auth.js';
import { roles } from '../middleware/roles.js';
import { sendBulkEmail } from '../services/mailer.js';

const router = Router();
router.use(auth, roles('manager', 'admin'));

router.get('/', async (_req, res, next) => {
  try {
    const items = await Newsletter.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post('/publish', async (req, res, next) => {
  try {
    const { title, subject, html, targetTiers = ['sub', 'vip'] } = req.body;
    if (!title || !subject || !html) {
      return res.status(400).json({ message: 'title, subject and html are required' });
    }

    const subscribers = await Subscriber.find({
      isActive: true,
      tier: { $in: targetTiers }
    }).select('email');

    const recipientEmails = subscribers.map((s) => s.email);
    const sendResult = await sendBulkEmail({
      recipients: recipientEmails,
      subject,
      html
    });

    const newsletter = await Newsletter.create({
      title,
      subject,
      html,
      targetTiers,
      sentCount: sendResult.accepted,
      sentAt: new Date(),
      createdBy: req.user.id
    });

    return res.status(201).json({
      newsletter,
      sendResult,
      totalRecipients: recipientEmails.length
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
