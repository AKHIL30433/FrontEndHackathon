import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { feedbackService } from '@/services/feedbackService';

const feedbackSchema = z.object({
    course: z.string().min(2, 'Course name must be at least 2 characters'),
    review: z.string().min(10, 'Review must be at least 10 characters'),
    grade: z.number().min(1, 'Please select a rating').max(5),
});

const FeedbackForm = ({ onSuccess, token }) => {
    const [loading, setLoading] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            course: '',
            review: '',
            grade: 0,
        },
    });

    const currentGrade = watch('grade');

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await feedbackService.createFeedback(data, token);
            toast.success('Feedback submitted successfully!');
            reset();
            onSuccess();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="course">Course / Subject</Label>
                        <Input
                            id="course"
                            placeholder="e.g. Mathematics 101"
                            {...register('course')}
                        />
                        {errors.course && (
                            <p className="text-sm text-destructive">{errors.course.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="focus:outline-none transition-transform hover:scale-110"
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    onClick={() => setValue('grade', star, { shouldValidate: true })}
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= (hoveredStar || currentGrade)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-muted-foreground'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {errors.grade && (
                            <p className="text-sm text-destructive">{errors.grade.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="review">Review</Label>
                        <Textarea
                            id="review"
                            placeholder="Share your experience..."
                            className="min-h-[100px]"
                            {...register('review')}
                        />
                        {errors.review && (
                            <p className="text-sm text-destructive">{errors.review.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Feedback'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default FeedbackForm;
