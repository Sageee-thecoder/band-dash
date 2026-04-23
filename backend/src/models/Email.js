import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    subject: String,
    body: String,
    category: { type: String, enum: ['fan', 'collab', 'legal', 'support'], default: 'fan' },
    status: { type: String, enum: ['open', 'draft', 'sent', 'archived'], default: 'open' }
  },
  { timestamps: true }
);

export default mongoose.model('Email', emailSchema);
