import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { assignmentService } from '@/services/assignmentService';
import { useAuth } from '@/context/AuthContext';

const CreateAssignment = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        guidelines: '',
        deadline: '',
        maxScore: '100',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await assignmentService.createAssignment(formData, token);
            toast.success('Assignment created successfully');
            navigate('/admin/manage-assignments');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/admin/manage-assignments">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground">Create Assignment</h1>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Assignment Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Group Project: Mobile App"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the assignment objectives..."
                                rows={4}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="guidelines">Project Guidelines</Label>
                            <Textarea
                                id="guidelines"
                                placeholder="Provide detailed guidelines for students..."
                                rows={6}
                                value={formData.guidelines}
                                onChange={(e) =>
                                    setFormData({ ...formData, guidelines: e.target.value })
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="deadline">Deadline</Label>
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) =>
                                        setFormData({ ...formData, deadline: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maxScore">Maximum Score</Label>
                                <Input
                                    id="maxScore"
                                    type="number"
                                    placeholder="100"
                                    value={formData.maxScore}
                                    onChange={(e) =>
                                        setFormData({ ...formData, maxScore: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Button type="submit" size="lg" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Create Assignment
                                    </>
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                asChild
                                disabled={loading}
                            >
                                <Link to="/admin/manage-assignments">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateAssignment;
