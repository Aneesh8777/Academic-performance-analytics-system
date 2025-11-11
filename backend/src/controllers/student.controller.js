import Student from '../models/Student.js';
import User from '../models/User.js';

export async function createStudent(req, res, next) {
  try {
    const { name, email, password, rollNumber, className, section } = req.body;
    const user = await User.create({ name, email, password, role: 'student' });
    const student = await Student.create({ user: user._id, rollNumber, className, section });
    res.status(201).json({ studentId: student._id });
  } catch (e) { next(e); }
}

export async function listStudents(_req, res, next) {
  try {
    const students = await Student.find().populate('user', 'name email').lean();
    res.json(students);
  } catch (e) { next(e); }
}

export async function getStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id).populate('user', 'name email').lean();
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (e) { next(e); }
}

export async function updateStudent(req, res, next) {
  try {
    const { className, section } = req.body;
    const student = await Student.findByIdAndUpdate(req.params.id, { className, section }, { new: true }).lean();
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (e) { next(e); }
}

export async function deleteStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    await student.deleteOne();
    res.json({ deleted: true });
  } catch (e) { next(e); }
}
