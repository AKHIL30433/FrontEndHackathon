import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    uploadSubmission,
    getSubmissionsForAssignment,
    getMySubmissions,
    gradeSubmission,
    getSubmissionsForPeerReview,
    createPeerReview,
    getReviewsForSubmission,
} from '../controllers/assignmentController.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// --- Assignment Routes ---

// Public/Student: Get all assignments
router.get('/', authMiddleware, getAllAssignments);
router.get('/:id', authMiddleware, getAssignmentById);

// Admin: Create assignment
router.post('/', authMiddleware, adminOnly, createAssignment);

// --- Submission Routes ---

// Student: Upload submission (File upload)
router.post('/:id/submit', authMiddleware, upload.single('file'), uploadSubmission);

// Student: Get my submissions
router.get('/my-submissions', authMiddleware, getMySubmissions);

// Admin: Get all submissions for an assignment
router.get('/:id/submissions', authMiddleware, adminOnly, getSubmissionsForAssignment);

// Admin: Grade a submission
router.post('/submissions/:id/grade', authMiddleware, adminOnly, gradeSubmission);

// --- Peer Review Routes ---

// Student: Get submissions available to review for an assignment
router.get('/:assignmentId/peer-review', authMiddleware, getSubmissionsForPeerReview);

// Student: Submit a peer review for a submission
router.post('/submissions/:submissionId/review', authMiddleware, createPeerReview);

// Student: Get reviews for their own submission (or any submission if allowed)
router.get('/submissions/:submissionId/reviews', authMiddleware, getReviewsForSubmission);

export default router;
