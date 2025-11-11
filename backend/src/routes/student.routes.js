import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { createStudent, listStudents, getStudent, updateStudent, deleteStudent } from '../controllers/student.controller.js';

const router = Router();
router.use(requireAuth);
router.get('/', requireRole('admin', 'teacher'), listStudents);
router.post('/', requireRole('admin', 'teacher'), createStudent);
router.get('/:id', requireRole('admin', 'teacher'), getStudent);
router.patch('/:id', requireRole('admin', 'teacher'), updateStudent);
router.delete('/:id', requireRole('admin'), deleteStudent);
export default router;
