import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';
import PeerReview from '../models/PeerReview.js';

// --- Assignment Operations ---

// Create Assignment (Admin)
export const createAssignment = async (req, res) => {
    try {
        const { title, description, guidelines, deadline, maxScore } = req.body;
        const assignment = new Assignment({
            title,
            description,
            guidelines,
            deadline,
            maxScore,
            createdBy: req.user._id,
        });
        await assignment.save();
        res.status(201).json({ message: 'Assignment created successfully', assignment });
    } catch (error) {
        console.error('Create assignment error:', error);
        res.status(500).json({ error: 'Failed to create assignment' });
    }
};

// Get All Assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ createdAt: -1 });
        res.json({ assignments });
    } catch (error) {
        console.error('Get assignments error:', error);
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

// Get Single Assignment
export const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
        res.json({ assignment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignment' });
    }
};

// --- Submission Operations ---

// Upload Submission (Student)
export const uploadSubmission = async (req, res) => {
    try {
        const { id } = req.params; // Assignment ID
        const { description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check if assignment exists
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        // Check if already submitted
        const existingSubmission = await Submission.findOne({
            student: req.user._id,
            assignment: id,
        });

        if (existingSubmission) {
            // Update existing submission
            existingSubmission.fileUrl = req.file.path;
            existingSubmission.originalFileName = req.file.originalname;
            existingSubmission.description = description || existingSubmission.description;
            await existingSubmission.save();
            return res.json({ message: 'Submission updated successfully', submission: existingSubmission });
        }

        // Create new submission
        const submission = new Submission({
            student: req.user._id,
            studentName: req.user.name,
            assignment: id,
            fileUrl: req.file.path,
            originalFileName: req.file.originalname,
            description,
        });

        await submission.save();
        res.status(201).json({ message: 'Assignment submitted successfully', submission });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Failed to submit assignment' });
    }
};

// Get Submissions for an Assignment (Admin)
export const getSubmissionsForAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const submissions = await Submission.find({ assignment: id })
            .populate('student', 'name email')
            .sort({ createdAt: -1 });
        res.json({ submissions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
};

// Get My Submissions (Student)
export const getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ student: req.user._id })
            .populate('assignment', 'title deadline maxScore');
        res.json({ submissions });
    } catch (error) {
        console.error('Get my submissions error:', error);
        res.status(500).json({ error: 'Failed to fetch your submissions' });
    }
};

// Grade Submission (Admin)
export const gradeSubmission = async (req, res) => {
    try {
        const { id } = req.params; // Submission ID
        const { score, feedback } = req.body;

        const submission = await Submission.findById(id);
        if (!submission) return res.status(404).json({ error: 'Submission not found' });

        submission.adminScore = score;
        submission.adminFeedback = feedback;
        submission.status = 'graded';
        await submission.save();

        res.json({ message: 'Submission graded successfully', submission });
    } catch (error) {
        res.status(500).json({ error: 'Failed to grade submission' });
    }
};

// --- Peer Review Operations ---

// Get Submissions available for Peer Review (Student)
// Returns submissions NOT belonging to the requester
export const getSubmissionsForPeerReview = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const userId = req.user._id;

        // Find submissions for this assignment, excluding own submission
        const submissions = await Submission.find({
            assignment: assignmentId,
            student: { $ne: userId }
        }).select('-fileUrl'); // Don't send file URL in list, only on detail if needed? Actually we need it to review.

        // In a real app, we might want to assign specific reviews. 
        // For now, return all others.
        res.json({ submissions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch submissions for review' });
    }
};

// Create Peer Review
export const createPeerReview = async (req, res) => {
    try {
        const { submissionId } = req.params;
        const { rating, comment } = req.body;

        const submission = await Submission.findById(submissionId);
        if (!submission) return res.status(404).json({ error: 'Submission not found' });

        if (submission.student.toString() === req.user._id.toString()) {
            return res.status(400).json({ error: 'Cannot review your own submission' });
        }

        const review = new PeerReview({
            reviewer: req.user._id,
            reviewerName: req.user.name,
            submission: submissionId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json({ message: 'Peer review submitted', review });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'You have already reviewed this submission' });
        }
        res.status(500).json({ error: 'Failed to submit review' });
    }
};

// Get Reviews for a Submission (Student viewing their own feedback)
export const getReviewsForSubmission = async (req, res) => {
    try {
        const { submissionId } = req.params;
        const reviews = await PeerReview.find({ submission: submissionId });
        res.json({ reviews });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
