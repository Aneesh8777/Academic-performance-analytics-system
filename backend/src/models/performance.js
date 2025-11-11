import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    exam: { type: String, enum: ['Midterm', 'Final', 'Quiz', 'Assignment'], required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    attendance: { type: Number, required: true, min: 0, max: 100 }, // percentage
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

performanceSchema.index({ student: 1, course: 1, exam: 1 }, { unique: true });

export default mongoose.model('Performance', performanceSchema);
