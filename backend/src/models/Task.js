import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: Date,
    status: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' }
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
