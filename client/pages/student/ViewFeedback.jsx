import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Loader2, Trash2, Edit2, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { feedbackService } from '@/services/feedbackService';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ViewFeedback = () => {
    const { token } = useAuth();
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchFeedback = async () => {
        setLoading(true);
        try {
            const data = await feedbackService.getMyFeedback(page, 10, 'createdAt', 'desc', token);
            setFeedback(data.feedback);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error('Failed to fetch your feedback');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, [page, token]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this feedback?')) return;

        try {
            await feedbackService.deleteFeedback(id, token);
            toast.success('Feedback deleted successfully');
            fetchFeedback();
        } catch (error) {
            toast.error('Failed to delete feedback');
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-foreground">
                        My Feedback
                    </h1>
                    <Button onClick={() => window.location.href = '/student/submit-feedback'}>
                        Submit New Feedback
                    </Button>
                </div>

                {feedback.length === 0 ? (
                    <Card className="p-12 text-center">
                        <p className="text-muted-foreground mb-4">
                            You haven't submitted any feedback yet.
                        </p>
                        <Button onClick={() => window.location.href = '/student/submit-feedback'}>
                            Submit Your First Feedback
                        </Button>
                    </Card>
                ) : (
                    <>
                        <div className="space-y-4">
                            {feedback.map((fb) => (
                                <Card key={fb._id} className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-foreground">
                                                    {fb.course}
                                                </h3>
                                                <span className="text-xs text-muted-foreground">
                                                    {formatDistanceToNow(new Date(fb.createdAt), {
                                                        addSuffix: true,
                                                    })}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1 mb-3">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`h-4 w-4 ${star <= fb.grade
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-muted-foreground/30'
                                                            }`}
                                                    />
                                                ))}
                                                <span className="text-sm text-muted-foreground ml-2">
                                                    {fb.grade}/5
                                                </span>
                                            </div>

                                            <p className="text-sm text-foreground whitespace-pre-wrap">
                                                {fb.review}
                                            </p>

                                            <div className="mt-3 text-xs text-muted-foreground">
                                                {fb.likes?.length || 0} {fb.likes?.length === 1 ? 'like' : 'likes'}
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => handleDelete(fb._id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                <Button
                                    variant="outline"
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                >
                                    Previous
                                </Button>
                                <span className="flex items-center px-4 text-sm text-muted-foreground">
                                    Page {page} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ViewFeedback;
