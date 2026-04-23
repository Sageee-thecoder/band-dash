import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { notFound, errorHandler } from './middleware/errors.js';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import dealsRoutes from './routes/deals.routes.js';
import emailsRoutes from './routes/emails.routes.js';
import songsRoutes from './routes/songs.routes.js';
import financeRoutes from './routes/finance.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import uploadsRoutes from './routes/uploads.routes.js';
import subscribersRoutes from './routes/subscribers.routes.js';
import newslettersRoutes from './routes/newsletters.routes.js';
import eventsRoutes from './routes/events.routes.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '4mb' }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/emails', emailsRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/subscribers', subscribersRoutes);
app.use('/api/newsletters', newslettersRoutes);
app.use('/api/events', eventsRoutes);

app.use(notFound);
app.use(errorHandler);

connectDb()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Backend listening on http://localhost:${env.port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start backend:', err.message);
    process.exit(1);
  });
