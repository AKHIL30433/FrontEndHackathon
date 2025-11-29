import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        studentName: {
            type: String, // Cached for easier display
        },
        assignment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
            required: true,
        },
        fileUrl: {
            type: String,
            required: [true, 'File is required'],
        },
        originalFileName: {
            type: String,
        },
        description: {
            type: String,
        },
        adminScore: {
            type: Number,
        },
        adminFeedback: {
            type: String,
        },
        status: {
            type: String,
            enum: ['submitted', 'graded'],
            default: 'submitted',
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure a student can only submit once per assignment (optional, but good practice)
submissionSchema.index({ student: 1, assignment: 1 }, { unique: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
