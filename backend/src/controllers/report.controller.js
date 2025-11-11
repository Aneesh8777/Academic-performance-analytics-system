import Student from '../models/Student.js';
import Performance from '../models/performance.js';
import { toCSV } from '../utils/csv.js';

export async function studentsReport(req, res, next) {
  try {
    const students = await Student.find().populate('user', 'name email').lean();
    const rows = [];
    for (const s of students) {
      const perf = await Performance.find({ student: s._id }).lean();
      const avg = perf.length ? (perf.reduce((a, b) => a + b.score, 0) / perf.length).toFixed(2) : '0';
      rows.push({
        studentId: s._id.toString(),
        name: s.user.name,
        email: s.user.email,
        rollNumber: s.rollNumber,
        className: s.className,
        section: s.section,
        averageScore: avg
      });
    }

    const format = (req.query.format || 'json').toLowerCase();
    if (format === 'csv') {
      const csv = await toCSV(rows, [
        { key: 'studentId', header: 'Student ID' },
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'rollNumber', header: 'Roll' },
        { key: 'className', header: 'Class' },
        { key: 'section', header: 'Section' },
        { key: 'averageScore', header: 'Average Score' }
      ]);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="students_report.csv"');
      return res.send(csv);
    }
    return res.json(rows);
  } catch (e) { next(e); }
}
