import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Star, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { assignmentService } from '@/services/assignmentService';
import { useAuth } from '@/context/AuthContext';

const PeerReview = () => {
    const { token } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewing, setReviewing] = useState(null); // ID of submission being reviewed

    // Review form state
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await assignmentService.getAllAssignments(token);
                setAssignments(data.assignments);
            } catch (error) {
                toast.error('Failed to load assignments');
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, [token]);

    useEffect(() => {
        if (!selectedAssignment) return;

        const fetchSubmissions = async () => {
            setLoading(true);
            try {
                const data = await assignmentService.getPeerReviews(selectedAssignment, token);
                setSubmissions(data.submissions);
            } catch (error) {
                toast.error('Failed to load submissions for review');
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, [selectedAssignment, token]);

    const handleReviewSubmit = async (submissionId) => {
        if (rating === 0 || !comment.trim()) {
            toast.error('Please provide a rating and comment');
            return;
        }

        setSubmitting(true);
        try {
            await assignmentService.submitPeerReview(submissionId, { rating, comment }, token);
            toast.success('Review submitted successfully');
            setReviewing(null);
            setRating(0);
            setComment('');
            // Ideally remove the reviewed submission from list or mark as reviewed
            setSubmissions(submissions.filter(s => s._id !== submissionId));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-foreground">Peer Review</h1>
                <p className="text-muted-foreground">Review submissions from your peers to help them improve.</p>

                <Card className="p-6">
                    <div className="space-y-4">
                        <Label>Select Assignment to Review</Label>
                        <Select onValueChange={setSelectedAssignment} value={selectedAssignment}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose an assignment..." />
                            </SelectTrigger>
                            <SelectContent>
                                {assignments.map((assignment) => (
                                    <SelectItem key={assignment._id} value={assignment._id}>
                                        {assignment.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </Card>

                {selectedAssignment && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Available Submissions</h2>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : submissions.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
                                No submissions available for review yet.
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {submissions.map((submission) => (
                                    <Card key={submission._id} className="flex flex-col">
                                        <CardHeader>
                                            <CardTitle className="text-base font-medium flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                Submission by {submission.studentName || 'Student'}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col gap-4">
                                            <div className="bg-muted/30 p-3 rounded text-sm">
                                                <p className="font-semibold mb-1">Description:</p>
                                                <p className="text-muted-foreground">{submission.description || 'No description provided.'}</p>
                                            </div>

                                            <Button variant="outline" className="w-full" asChild>
                                                <a href={`http://localhost:8080/${submission.fileUrl}`} target="_blank" rel="noopener noreferrer">
                                                    View Project File
                                                </a>
                                            </Button>

                                            {reviewing === submission._id ? (
                                                <div className="mt-4 space-y-4 border-t pt-4">
                                                    <div className="space-y-2">
                                                        <Label>Rating (1-10)</Label>
                                                        <div className="flex gap-1">
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                                <button
                                                                    key={num}
                                                                    type="button"
                                                                    className={`w-6 h-6 text-xs rounded-full flex items-center justify-center transition-colors ${rating >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                                                        }`}
                                                                    onClick={() => setRating(num)}
                                                                >
                                                                    {num}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Feedback Comment</Label>
                                                        <Textarea
                                                            placeholder="Write your constructive feedback here..."
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            className="flex-1"
                                                            onClick={() => handleReviewSubmit(submission._id)}
                                                            disabled={submitting}
                                                        >
                                                            {submitting ? 'Submitting...' : 'Submit Review'}
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => setReviewing(null)}
                                                            disabled={submitting}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Button className="mt-auto" onClick={() => setReviewing(submission._id)}>
                                                    Write Review
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default PeerReview;
