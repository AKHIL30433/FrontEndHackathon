import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { feedbackService } from '@/services/feedbackService';

const SubmitFeedback = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [rating, setRating] = useState(0);
    const [course, setCourse] = useState('');
    const [feedback, setFeedback] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (feedback.length < 10) {
            toast.error('Review must be at least 10 characters long');
            return;
        }

        setLoading(true);
        try {
            await feedbackService.createFeedback(
                {
                    course,
                    review: feedback,
                    grade: rating,
                },
                token
            );
            toast.success('Feedback submitted successfully!');
            // Reset form
            setRating(0);
            setCourse('');
            setFeedback('');
            // Navigate to view feedback page after a short delay
            setTimeout(() => {
                navigate('/student/view-feedback');
            }, 1500);
        } catch (error) {
            toast.error(error.message || 'Failed to submit feedback');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground">
                        Submit Feedback
                    </h1>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="course">Course / Subject</Label>
                            <Input
                                id="course"
                                placeholder="e.g. Mathematics 101, Web Development"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Rating</Label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            className={`h-8 w-8 ${star <= (hoveredRating || rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-muted-foreground'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            {rating > 0 && (
                                <p className="text-sm text-muted-foreground">
                                    {rating} out of 5 stars
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="feedback">Detailed Feedback</Label>
                            <Textarea
                                id="feedback"
                                placeholder="Share your experience and thoughts..."
                                rows={8}
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                                minLength={10}
                            />
                            <p className="text-xs text-muted-foreground">
                                {feedback.length} characters (minimum 10 required)
                            </p>
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Button type="submit" size="lg" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Feedback'
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default SubmitFeedback;
