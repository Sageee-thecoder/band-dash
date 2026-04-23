import mongoose from 'mongoose';

const revenueSchema = new mongoose.Schema(
  {
    source: String,
    amount: Number,
    currency: { type: String, default: 'USD' },
    period: String,
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model('Revenue', revenueSchema);
