import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PublicLayout from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [activeTab, setActiveTab] = useState("student");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [studentData, setStudentData] = useState({
        email: "",
        password: "",
        name: "",
        studentId: "",
        department: "",
        year: "",
    });

    const [adminData, setAdminData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const handleStudentChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleAdminChange = (e) => {
        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const endpoint = activeTab === "admin" ? "/api/admin/register" : "/api/student/register";
            const data = activeTab === "admin" ? adminData : studentData;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Registration failed");
            }

            // Store token and user data
            login(result.token, result[activeTab], activeTab);

            // Navigate to appropriate dashboard
            navigate(activeTab === "admin" ? "/admin/dashboard" : "/student/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PublicLayout>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                        <CardDescription className="text-center">
                            Sign up to get started with PeerFlow
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="student">Student</TabsTrigger>
                                <TabsTrigger value="admin">Admin</TabsTrigger>
                            </TabsList>

                            <TabsContent value="student">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={studentData.name}
                                            onChange={handleStudentChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="student@example.com"
                                            value={studentData.email}
                                            onChange={handleStudentChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="studentId">Student ID</Label>
                                        <Input
                                            id="studentId"
                                            name="studentId"
                                            type="text"
                                            placeholder="S12345"
                                            value={studentData.studentId}
                                            onChange={handleStudentChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input
                                            id="department"
                                            name="department"
                                            type="text"
                                            placeholder="Computer Science"
                                            value={studentData.department}
                                            onChange={handleStudentChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="year">Year</Label>
                                        <Input
                                            id="year"
                                            name="year"
                                            type="number"
                                            placeholder="1"
                                            min="1"
                                            max="6"
                                            value={studentData.year}
                                            onChange={handleStudentChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={studentData.password}
                                            onChange={handleStudentChange}
                                            required
                                            minLength={6}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            "Sign Up as Student"
                                        )}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="admin">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="admin-name">Full Name</Label>
                                        <Input
                                            id="admin-name"
                                            name="name"
                                            type="text"
                                            placeholder="Jane Smith"
                                            value={adminData.name}
                                            onChange={handleAdminChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="admin-email">Email</Label>
                                        <Input
                                            id="admin-email"
                                            name="email"
                                            type="email"
                                            placeholder="admin@example.com"
                                            value={adminData.email}
                                            onChange={handleAdminChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="admin-password">Password</Label>
                                        <Input
                                            id="admin-password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={adminData.password}
                                            onChange={handleAdminChange}
                                            required
                                            minLength={6}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            "Sign Up as Admin"
                                        )}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PublicLayout>
    );
};

export default Signup;
