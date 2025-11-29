import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Plus, Loader2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { assignmentService } from '@/services/assignmentService';
import { useAuth } from '@/context/AuthContext';

const ManageAssignments = () => {
    const { token } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-3xl font-bold text-foreground">Manage Assignments</h1>
                    <Button asChild>
                        <Link to="/admin/create-assignment">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Assignment
                        </Link>
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : assignments.length === 0 ? (
                    <Card className="p-8">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                No Assignments Yet
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Create your first assignment to get started.
                            </p>
                            <Button asChild>
                                <Link to="/admin/create-assignment">Create Assignment</Link>
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {assignments.map((assignment) => (
                            <Card key={assignment._id} className="overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl">{assignment.title}</CardTitle>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Calendar className="h-4 w-4" />
                                                Due: {new Date(assignment.deadline).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                            {assignment.maxScore} Points
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-2 mb-4">
                                        {assignment.description}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link to="/admin/review-submissions">View Submissions</Link>
                                        </Button>
                                        {/* Add Edit/Delete buttons here later */}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ManageAssignments;
