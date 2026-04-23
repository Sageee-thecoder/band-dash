import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema(
  {
    partner: String,
    type: String,
    amount: Number,
    status: { type: String, default: 'new' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Deal', dealSchema);
