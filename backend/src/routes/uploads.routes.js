import { Router } from 'express';
import multer from 'multer';
import File from '../models/File.js';
import { auth } from '../middleware/auth.js';

const upload = multer({ dest: 'uploads/' });
const router = Router();
router.use(auth);

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const record = await File.create({
      originalName: req.file.originalname,
      storageKey: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      linkedModel: req.body.linkedModel,
      linkedId: req.body.linkedId
    });

    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
});

export default router;
