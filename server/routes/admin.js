import express from 'express';
import {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
} from '../controllers/adminController.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes
router.get('/', authMiddleware, adminOnly, getAllAdmins);
router.get('/:id', authMiddleware, getAdminById);
router.put('/:id', authMiddleware, updateAdmin);
router.delete('/:id', authMiddleware, adminOnly, deleteAdmin);

export default router;
