import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rollNumber: { type: String, required: true, unique: true },
    className: { type: String, required: true },
    section: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
