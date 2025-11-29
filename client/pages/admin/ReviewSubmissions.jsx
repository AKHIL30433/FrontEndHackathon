import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Eye, FileText, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { assignmentService } from '@/services/assignmentService';
import { useAuth } from '@/context/AuthContext';

const ReviewSubmissions = () => {
    const { token } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [grading, setGrading] = useState(null); // ID of submission being graded

    // Grading form state
    const [score, setScore] = useState('');
    const [feedback, setFeedback] = useState('');
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
                const data = await assignmentService.getSubmissions(selectedAssignment, token);
                setSubmissions(data.submissions);
            } catch (error) {
                toast.error('Failed to load submissions');
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, [selectedAssignment, token]);

    const handleGradeSubmit = async (submissionId) => {
        if (!score) {
            toast.error('Please provide a score');
            return;
        }

        setSubmitting(true);
        try {
            await assignmentService.gradeSubmission(submissionId, { score: Number(score), feedback }, token);
            toast.success('Submission graded successfully');
            setGrading(null);
            setScore('');
            setFeedback('');
            // Refresh submissions
            const data = await assignmentService.getSubmissions(selectedAssignment, token);
            setSubmissions(data.submissions);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-foreground">Review Submissions</h1>
                <p className="text-muted-foreground">View and grade student submissions.</p>

                <Card className="p-6">
                    <div className="space-y-4">
                        <Label>Select Assignment</Label>
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
                        <h2 className="text-xl font-semibold">Submissions ({submissions.length})</h2>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : submissions.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
                                No submissions found for this assignment.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {submissions.map((submission) => (
                                    <Card key={submission._id} className="overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{submission.student?.name || 'Unknown Student'}</h3>
                                                    <p className="text-sm text-muted-foreground">Submitted: {new Date(submission.createdAt).toLocaleString()}</p>
                                                </div>
                                                {submission.status === 'graded' ? (
                                                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                        <CheckCircle className="h-4 w-4" />
                                                        <span className="font-medium">Graded: {submission.adminScore}</span>
                                                    </div>
                                                ) : (
                                                    <div className="text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm font-medium">
                                                        Pending Grade
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-muted/30 p-4 rounded-lg mb-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">Submission File:</span>
                                                    <a
                                                        href={`http://localhost:8080/${submission.fileUrl}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        {submission.originalFileName || 'View File'}
                                                    </a>
                                                </div>
                                                {submission.description && (
                                                    <p className="text-sm text-muted-foreground mt-2">{submission.description}</p>
                                                )}
                                            </div>

                                            {grading === submission._id ? (
                                                <div className="border-t pt-4 space-y-4">
                                                    <div className="grid gap-4 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <Label>Score</Label>
                                                            <Input
                                                                type="number"
                                                                placeholder="Enter score"
                                                                value={score}
                                                                onChange={(e) => setScore(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Feedback (Optional)</Label>
                                                            <Input
                                                                placeholder="Enter feedback"
                                                                value={feedback}
                                                                onChange={(e) => setFeedback(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button onClick={() => handleGradeSubmit(submission._id)} disabled={submitting}>
                                                            {submitting ? 'Saving...' : 'Save Grade'}
                                                        </Button>
                                                        <Button variant="ghost" onClick={() => setGrading(null)} disabled={submitting}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end">
                                                    <Button variant="outline" onClick={() => {
                                                        setGrading(submission._id);
                                                        setScore(submission.adminScore || '');
                                                        setFeedback(submission.adminFeedback || '');
                                                    }}>
                                                        {submission.status === 'graded' ? 'Edit Grade' : 'Grade Submission'}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
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

export default ReviewSubmissions;
