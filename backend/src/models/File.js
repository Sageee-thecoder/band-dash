import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    originalName: String,
    storageKey: String,
    mimeType: String,
    size: Number,
    linkedModel: String,
    linkedId: String
  },
  { timestamps: true }
);

export default mongoose.model('File', fileSchema);
