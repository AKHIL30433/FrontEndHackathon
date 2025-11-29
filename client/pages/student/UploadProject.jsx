import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, ArrowLeft, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { assignmentService } from '@/services/assignmentService';
import { useAuth } from '@/context/AuthContext';

const UploadProject = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        assignmentId: '',
        description: '',
        file: null,
    });

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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.assignmentId || !formData.file) {
            toast.error('Please select an assignment and upload a file');
            return;
        }

        setSubmitting(true);
        try {
            const data = new FormData();
            data.append('description', formData.description);
            data.append('file', formData.file);

            await assignmentService.uploadSubmission(formData.assignmentId, data, token);
            toast.success('Project uploaded successfully!');
            navigate('/student/dashboard');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/student/dashboard">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground">Upload Project</h1>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="assignment">Select Assignment</Label>
                            <Select
                                onValueChange={(value) => setFormData({ ...formData, assignmentId: value })}
                                value={formData.assignmentId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an assignment..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {assignments.map((assignment) => (
                                        <SelectItem key={assignment._id} value={assignment._id}>
                                            {assignment.title} (Due: {new Date(assignment.deadline).toLocaleDateString()})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your project submission..."
                                rows={5}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="files">Project File</Label>
                            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 hover:bg-muted/70 transition-colors">
                                <div className="text-center w-full">
                                    {formData.file ? (
                                        <div className="flex flex-col items-center">
                                            <FileText className="h-12 w-12 text-primary mb-2" />
                                            <p className="font-medium text-foreground">{formData.file.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 text-destructive hover:text-destructive"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFormData({ ...formData, file: null });
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                            <p className="font-semibold text-foreground">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                PDF, ZIP, or Code files (Max 10MB)
                                            </p>
                                            <Input
                                                id="files"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            // Using label as trigger for hidden input
                                            />
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                className="mt-4"
                                                onClick={() => document.getElementById('files').click()}
                                            >
                                                Select File
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Button type="submit" size="lg" disabled={submitting || loading}>
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    'Upload Project'
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                asChild
                                disabled={submitting}
                            >
                                <Link to="/student/dashboard">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default UploadProject;
