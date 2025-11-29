import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogOut, Loader2, User, Mail, BookOpen, Calendar } from "lucide-react";
import { assignmentService } from "@/services/assignmentService";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { user, token, logout, userRole } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [studentData, setStudentData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        department: "",
        year: "",
    });

    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        if (!user || userRole !== "student") {
            navigate("/login");
            return;
        }
        fetchStudentData();
        fetchAssignments();
    }, [user, userRole, navigate]);

    const fetchAssignments = async () => {
        try {
            // Fetch all assignments and my submissions in parallel
            const [assignmentsData, submissionsData] = await Promise.all([
                assignmentService.getAllAssignments(token),
                assignmentService.getMySubmissions(token)
            ]);

            const allAssignments = assignmentsData.assignments;
            const mySubmissions = submissionsData.submissions;

            // Merge data to add status
            const mergedAssignments = allAssignments.map(assignment => {
                const submission = mySubmissions.find(s => s.assignment._id === assignment._id || s.assignment === assignment._id);
                let status = 'not_started';
                let grade = null;
                let feedback = null;

                if (submission) {
                    status = submission.status === 'graded' ? 'graded' : 'submitted';
                    grade = submission.adminScore;
                    feedback = submission.adminFeedback;
                } else if (new Date(assignment.deadline) < new Date()) {
                    status = 'overdue';
                }

                return {
                    ...assignment,
                    status,
                    grade,
                    feedback,
                    submissionId: submission?._id
                };
            });

            setAssignments(mergedAssignments);
        } catch (err) {
            console.error("Failed to fetch assignments", err);
        }
    };

    const fetchStudentData = async () => {
        try {
            const response = await fetch(`/api/student/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch student data");
            }

            setStudentData(data.student);
            setEditData({
                name: data.student.name,
                email: data.student.email,
                department: data.student.department,
                year: data.student.year,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`/api/student/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update profile");
            }

            setStudentData(data.student);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Student Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Welcome back, {studentData?.name}</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>View and manage your profile details</CardDescription>
                                </div>
                                {!isEditing && (
                                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isEditing ? (
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input
                                            id="department"
                                            value={editData.department}
                                            onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year">Year</Label>
                                        <Input
                                            id="year"
                                            type="number"
                                            min="1"
                                            max="6"
                                            value={editData.year}
                                            onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="submit">Save Changes</Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditData({
                                                    name: studentData.name,
                                                    email: studentData.email,
                                                    department: studentData.department,
                                                    year: studentData.year,
                                                });
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Name</p>
                                            <p className="font-medium">{studentData?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{studentData?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Student ID</p>
                                            <p className="font-medium">{studentData?.studentId}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Department</p>
                                            <p className="font-medium">{studentData?.department}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Year</p>
                                            <p className="font-medium">Year {studentData?.year}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Assignments</CardTitle>
                            <CardDescription>Your upcoming assignments and submissions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {assignments.length === 0 ? (
                                <p className="text-muted-foreground text-center py-8">
                                    No assignments yet. Check back later for new assignments.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {assignments.map((assignment) => (
                                        <div key={assignment._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg gap-4">
                                            <div>
                                                <h3 className="font-semibold">{assignment.title}</h3>
                                                <p className="text-sm text-muted-foreground">Due: {new Date(assignment.deadline).toLocaleDateString()}</p>
                                                <p className="text-sm text-muted-foreground">Max Score: {assignment.maxScore}</p>

                                                {/* Status Badge */}
                                                <div className="mt-2">
                                                    {assignment.status === 'graded' && (
                                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                            Graded: {assignment.grade}/{assignment.maxScore}
                                                        </span>
                                                    )}
                                                    {assignment.status === 'submitted' && (
                                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                            Submitted
                                                        </span>
                                                    )}
                                                    {assignment.status === 'overdue' && (
                                                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                                            Overdue
                                                        </span>
                                                    )}
                                                    {assignment.status === 'not_started' && (
                                                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                                            Not Submitted
                                                        </span>
                                                    )}
                                                </div>
                                                {assignment.feedback && (
                                                    <p className="text-xs text-muted-foreground mt-1">Feedback: {assignment.feedback}</p>
                                                )}
                                            </div>
                                            <Button asChild variant={assignment.status === 'graded' ? "outline" : "default"}>
                                                <a href="/student/upload-project">
                                                    {assignment.status === 'not_started' || assignment.status === 'overdue' ? 'Submit Project' : 'View Submission'}
                                                </a>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
