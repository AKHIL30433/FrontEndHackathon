import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        guidelines: {
            type: String,
        },
        deadline: {
            type: Date,
            required: [true, 'Deadline is required'],
        },
        maxScore: {
            type: Number,
            required: [true, 'Max score is required'],
            default: 100,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
