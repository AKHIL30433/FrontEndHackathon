import express from 'express';
import {
    registerStudent,
    loginStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} from '../controllers/studentController.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Protected routes
router.get('/', authMiddleware, adminOnly, getAllStudents);
router.get('/:id', authMiddleware, getStudentById);
router.put('/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, adminOnly, deleteStudent);

export default router;
