import Feedback from '../models/Feedback.js';

// Create new feedback
export const createFeedback = async (req, res) => {
    try {
        const { course, review, grade } = req.body;
        const studentId = req.user._id;
        const studentName = req.user.name; // Assuming user object has name from auth middleware

        const feedback = new Feedback({
            student: studentId,
            studentName,
            course,
            review,
            grade,
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        console.error('Create feedback error:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
};

// Get all feedback (with pagination, filtering, and search)
export const getAllFeedback = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;

        // Build filter query
        const filter = {};

        // Filter by rating/grade
        if (req.query.rating) {
            filter.grade = parseInt(req.query.rating);
        }

        // Filter by course
        if (req.query.course) {
            filter.course = { $regex: req.query.course, $options: 'i' };
        }

        // Filter by student name
        if (req.query.student) {
            filter.studentName = { $regex: req.query.student, $options: 'i' };
        }

        // Search across multiple fields
        if (req.query.search) {
            const searchRegex = { $regex: req.query.search, $options: 'i' };
            filter.$or = [
                { review: searchRegex },
                { course: searchRegex },
                { studentName: searchRegex }
            ];
        }

        const feedback = await Feedback.find(filter)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit);

        const total = await Feedback.countDocuments(filter);

        res.json({
            feedback,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalFeedback: total,
        });
    } catch (error) {
        console.error('Get feedback error:', error);
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
};

// Get feedback for current student
export const getMyFeedback = async (req, res) => {
    try {
        const studentId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;

        const feedback = await Feedback.find({ student: studentId })
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit);

        const total = await Feedback.countDocuments({ student: studentId });

        res.json({
            feedback,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalFeedback: total,
        });
    } catch (error) {
        console.error('Get my feedback error:', error);
        res.status(500).json({ error: 'Failed to fetch your feedback' });
    }
};

// Get single feedback by ID
export const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.json(feedback);
    } catch (error) {
        console.error('Get feedback by ID error:', error);
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
};

// Update feedback (Owner or Admin)
export const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { course, review, grade } = req.body;
        const userId = req.user._id;
        const userRole = req.user.role; // Fixed: use req.user.role from auth middleware

        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        // Check ownership or admin privileges
        if (userRole !== 'admin' && userRole !== 'super-admin' && feedback.student.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Not authorized to update this feedback' });
        }

        feedback.course = course || feedback.course;
        feedback.review = review || feedback.review;
        feedback.grade = grade || feedback.grade;

        await feedback.save();
        res.json({ message: 'Feedback updated successfully', feedback });
    } catch (error) {
        console.error('Update feedback error:', error);
        res.status(500).json({ error: 'Failed to update feedback' });
    }
};

// Delete feedback (Owner or Admin)
export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const userRole = req.user.role; // Fixed: use req.user.role from auth middleware

        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        if (userRole !== 'admin' && userRole !== 'super-admin' && feedback.student.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this feedback' });
        }

        await feedback.deleteOne();
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Delete feedback error:', error);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
};

// Toggle like
export const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        const index = feedback.likes.indexOf(userId);

        if (index === -1) {
            feedback.likes.push(userId);
        } else {
            feedback.likes.splice(index, 1);
        }

        await feedback.save();
        res.json({ likes: feedback.likes });
    } catch (error) {
        console.error('Toggle like error:', error);
        res.status(500).json({ error: 'Failed to toggle like' });
    }
};

// Get feedback statistics
export const getFeedbackStats = async (req, res) => {
    try {
        const stats = await Feedback.aggregate([
            {
                $group: {
                    _id: null,
                    averageGrade: { $avg: '$grade' },
                    totalReviews: { $sum: 1 },
                    gradeDistribution: {
                        $push: '$grade'
                    }
                }
            }
        ]);

        if (stats.length === 0) {
            return res.json({
                averageGrade: 0,
                totalReviews: 0,
                distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            });
        }

        // Calculate distribution
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        stats[0].gradeDistribution.forEach(grade => {
            if (distribution[grade] !== undefined) {
                distribution[grade]++;
            }
        });

        res.json({
            averageGrade: parseFloat(stats[0].averageGrade.toFixed(1)),
            totalReviews: stats[0].totalReviews,
            distribution
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};
