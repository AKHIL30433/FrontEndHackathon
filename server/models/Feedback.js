import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        studentName: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: [true, 'Course/Subject is required'],
            trim: true,
        },
        review: {
            type: String,
            required: [true, 'Review text is required'],
            trim: true,
            minlength: [10, 'Review must be at least 10 characters long'],
        },
        grade: {
            type: Number,
            required: [true, 'Grade is required'],
            min: 1,
            max: 5,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student', // Or 'User' if we had a common base, but mainly students will like
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
