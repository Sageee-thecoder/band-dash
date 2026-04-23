import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    type: {
      type: String,
      enum: ['rehearsal', 'recording', 'meeting', 'performance', 'release', 'other'],
      default: 'other'
    },
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [
      {
        type: String,
        enum: ['manager', 'emine', 'ali', 'all']
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
