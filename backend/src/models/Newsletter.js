import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    html: { type: String, required: true },
    targetTiers: {
      type: [String],
      enum: ['sub', 'vip'],
      default: ['sub', 'vip']
    },
    sentCount: { type: Number, default: 0 },
    sentAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Newsletter', newsletterSchema);
