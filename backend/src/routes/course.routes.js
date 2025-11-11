import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { createCourse, listCourses, updateCourse, deleteCourse } from '../controllers/course.controller.js';

const router = Router();
router.use(requireAuth);
router.get('/', requireRole('admin', 'teacher'), listCourses);
router.post('/', requireRole('admin', 'teacher'), createCourse);
router.patch('/:id', requireRole('admin', 'teacher'), updateCourse);
router.delete('/:id', requireRole('admin'), deleteCourse);
export default router;
