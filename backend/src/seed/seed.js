import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Course from '../models/Course.js';
import Performance from '../models/performance.js';

async function run() {
  await connectDB();

  await Performance.deleteMany({});
  await Course.deleteMany({});
  await Student.deleteMany({});
  await User.deleteMany({});

  const admin = await User.create({ name: 'Aneesh', email: 'admin@example.com', password: 'admin123', role: 'admin' });
  const teacher = await User.create({ name: 'Ahana', email: 'teacher@example.com', password: 'teacher123', role: 'teacher' });
  const sUser1 = await User.create({ name: 'Anoop', email: 'anoop@example.com', password: 'student123', role: 'student' });
  const sUser2 = await User.create({ name: 'Afrah', email: 'afrah@example.com', password: 'student123', role: 'student' });

  const s1 = await Student.create({ user: sUser1._id, rollNumber: 'S001', className: '10', section: 'A' });
  const s2 = await Student.create({ user: sUser2._id, rollNumber: 'S002', className: '10', section: 'A' });

  const math = await Course.create({ name: 'Mathematics', code: 'MTH101', teacher: teacher._id });
  const sci  = await Course.create({ name: 'Science', code: 'SCI101', teacher: teacher._id });

  await Performance.insertMany([
    { student: s1._id, course: math._id, exam: 'Midterm', score: 78, attendance: 92 },
    { student: s1._id, course: math._id, exam: 'Final',   score: 84, attendance: 94 },
    { student: s1._id, course: sci._id,  exam: 'Quiz',    score: 72, attendance: 90 },
    { student: s2._id, course: math._id, exam: 'Midterm', score: 66, attendance: 88 },
    { student: s2._id, course: sci._id,  exam: 'Final',   score: 81, attendance: 91 }
  ]);

  console.log('✅ Seeded sample data');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
