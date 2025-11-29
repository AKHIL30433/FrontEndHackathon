import mongoose from 'mongoose';

const peerReviewSchema = new mongoose.Schema(
    {
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        reviewerName: {
            type: String,
        },
        submission: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission',
            required: true,
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: 1,
            max: 10, // Let's use 1-10 for peer reviews
        },
        comment: {
            type: String,
            required: [true, 'Comment is required'],
        },
    },
    {
        timestamps: true,
    }
);

// Ensure a student can review a submission only once
peerReviewSchema.index({ reviewer: 1, submission: 1 }, { unique: true });

const PeerReview = mongoose.model('PeerReview', peerReviewSchema);

export default PeerReview;
