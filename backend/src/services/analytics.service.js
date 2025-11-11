import Performance from '../models/performance.js';

export async function analyticsForStudent(studentId) {
  const perf = await Performance.find({ student: studentId }).populate('course', 'name code').lean();

  if (perf.length === 0) {
    return { averageScore: 0, averageAttendance: 0, exams: [], byCourse: [] };
  }

  const averageScore = Number((perf.reduce((a, b) => a + b.score, 0) / perf.length).toFixed(2));
  const averageAttendance = Number((perf.reduce((a, b) => a + b.attendance, 0) / perf.length).toFixed(2));

  const byCourseMap = {};
  for (const p of perf) {
    const key = p.course._id.toString();
    if (!byCourseMap[key]) {
      byCourseMap[key] = { courseId: key, courseName: p.course.name, exams: [], avgScore: 0 };
    }
    byCourseMap[key].exams.push({ exam: p.exam, score: p.score, date: p.date });
  }
  const byCourse = Object.values(byCourseMap).map(c => {
    const avg = c.exams.reduce((a, b) => a + b.score, 0) / c.exams.length;
    return { ...c, avgScore: Number(avg.toFixed(2)) };
  });

  const exams = perf.map(p => ({ course: p.course.name, exam: p.exam, score: p.score, attendance: p.attendance, date: p.date }));

  return { averageScore, averageAttendance, exams, byCourse };
}
