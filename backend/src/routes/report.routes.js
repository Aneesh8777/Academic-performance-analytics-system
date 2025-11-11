import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { studentsReport } from '../controllers/report.controller.js';

const router = Router();
router.use(requireAuth);
router.get('/students', requireRole('admin', 'teacher'), studentsReport); // ?format=csv|json
export default router;
