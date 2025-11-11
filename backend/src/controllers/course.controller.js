import Course from '../models/Course.js';

export async function createCourse(req, res, next) {
  try {
    const { name, code, teacherId } = req.body;
    const course = await Course.create({ name, code, teacher: teacherId || req.user.id });
    res.status(201).json(course);
  } catch (e) { next(e); }
}

export async function listCourses(_req, res, next) {
  try {
    const courses = await Course.find().populate('teacher', 'name email').lean();
    res.json(courses);
  } catch (e) { next(e); }
}

export async function updateCourse(req, res, next) {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!course) return res.status(404).json({ message: 'Not found' });
    res.json(course);
  } catch (e) { next(e); }
}

export async function deleteCourse(req, res, next) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    await course.deleteOne();
    res.json({ deleted: true });
  } catch (e) { next(e); }
}
