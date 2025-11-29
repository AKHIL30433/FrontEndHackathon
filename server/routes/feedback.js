import express from 'express';
import {
    createFeedback,
    getAllFeedback,
    getMyFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    toggleLike,
    getFeedbackStats,
} from '../controllers/feedbackController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes (or protected if you want only logged in users to see)
// Assuming we want everyone to see feedback but only logged in to interact
router.get('/', getAllFeedback);
router.get('/stats', getFeedbackStats);

// Protected routes
router.get('/my-feedback', authMiddleware, getMyFeedback);
router.get('/:id', getFeedbackById);
router.post('/', authMiddleware, createFeedback);
router.put('/:id', authMiddleware, updateFeedback);
router.delete('/:id', authMiddleware, deleteFeedback);
router.post('/:id/like', authMiddleware, toggleLike);

export default router;
