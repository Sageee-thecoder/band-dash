import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: String,
    writers: [String],
    stage: { type: String, enum: ['idea', 'draft', 'melody', 'mix', 'publish'], default: 'idea' },
    isPublished: { type: Boolean, default: false },
    releaseDate: Date
  },
  { timestamps: true }
);

export default mongoose.model('Song', songSchema);
