import { analyticsForStudent } from '../services/analytics.service.js';
import Performance from '../models/performance.js';

export async function getStudentAnalytics(req, res, next) {
  try {
    const { studentId } = req.params;
    const data = await analyticsForStudent(studentId);
    res.json(data);
  } catch (e) { next(e); }
}

export async function upsertPerformance(req, res, next) {
  try {
    const { student, course, exam, score, attendance, date } = req.body;
    const doc = await Performance.findOneAndUpdate(
      { student, course, exam },
      { $set: { score, attendance, date: date ? new Date(date) : new Date() } },
      { new: true, upsert: true }
    );
    res.status(201).json(doc);
  } catch (e) { next(e); }
}
