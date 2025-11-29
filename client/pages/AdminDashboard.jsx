import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, UserPlus, Trash2, LogOut, Loader2 } from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, token, logout, userRole } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        studentId: "",
        department: "",
        year: "",
        password: "",
    });

    useEffect(() => {
        if (!user || userRole !== "admin") {
            navigate("/login");
            return;
        }
        fetchStudents();
    }, [user, userRole, navigate]);

    const fetchStudents = async () => {
        try {
            const response = await fetch("/api/student", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch students");
            }

            setStudents(data.students);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/student/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to add student");
            }

            setIsAddDialogOpen(false);
            setNewStudent({
                name: "",
                email: "",
                studentId: "",
                department: "",
                year: "",
                password: "",
            });
            fetchStudents();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteStudent = async (studentId) => {
        if (!confirm("Are you sure you want to delete this student?")) {
            return;
        }

        try {
            const response = await fetch(`/api/student/${studentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to delete student");
            }

            fetchStudents();
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
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
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

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{students.length}</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Students</CardTitle>
                                <CardDescription>Manage all registered students</CardDescription>
                            </div>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Add Student
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Student</DialogTitle>
                                        <DialogDescription>Enter student details to create a new account</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddStudent} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="add-name">Full Name</Label>
                                            <Input
                                                id="add-name"
                                                value={newStudent.name}
                                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="add-email">Email</Label>
                                            <Input
                                                id="add-email"
                                                type="email"
                                                value={newStudent.email}
                                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="add-studentId">Student ID</Label>
                                            <Input
                                                id="add-studentId"
                                                value={newStudent.studentId}
                                                onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="add-department">Department</Label>
                                            <Input
                                                id="add-department"
                                                value={newStudent.department}
                                                onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="add-year">Year</Label>
                                            <Input
                                                id="add-year"
                                                type="number"
                                                min="1"
                                                max="6"
                                                value={newStudent.year}
                                                onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="add-password">Password</Label>
                                            <Input
                                                id="add-password"
                                                type="password"
                                                minLength={6}
                                                value={newStudent.password}
                                                onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">Add Student</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                                            No students found. Add your first student to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    students.map((student) => (
                                        <TableRow key={student._id}>
                                            <TableCell className="font-medium">{student.name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{student.studentId}</TableCell>
                                            <TableCell>{student.department}</TableCell>
                                            <TableCell>{student.year}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteStudent(student._id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
