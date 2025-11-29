import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Public Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

// Admin Pages
import AdminDashboard from "@/pages/AdminDashboard";
import CreateAssignment from "@/pages/admin/CreateAssignment";
// import ManageStudents from "@/pages/admin/ManageStudents";
import ManageAssignments from "@/pages/admin/ManageAssignments";
import ReviewSubmissions from "@/pages/admin/ReviewSubmissions";
// import CollaborationMonitor from "@/pages/admin/CollaborationMonitor";
// import AdminProfile from "@/pages/admin/AdminProfile";

// Student Pages
import StudentDashboard from "@/pages/StudentDashboard";
import UploadProject from "@/pages/student/UploadProject";
import PeerReview from "@/pages/student/PeerReview";
// import SubmitFeedback from "@/pages/student/SubmitFeedback";
// import CollaborationChat from "@/pages/student/CollaborationChat";
// import ViewFeedback from "@/pages/student/ViewFeedback";
// import StudentProfile from "@/pages/student/StudentProfile";

import FeedbackPage from "@/pages/FeedbackPage";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, loading, userRole } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-semibold text-gray-600">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/not-found" replace />;
    }

    return <>{children}</>;
};

const AppRouter = () => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-semibold text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
                />
                <Route
                    path="/signup"
                    element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />}
                />

                {/* Admin Routes */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/create-assignment"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <CreateAssignment />
                        </ProtectedRoute>
                    }
                />
                {/* 
                <Route
                    path="/admin/manage-students"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <ManageStudents />
                        </ProtectedRoute>
                    }
                />
                */}
                <Route
                    path="/admin/manage-assignments"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <ManageAssignments />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/review-submissions"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <ReviewSubmissions />
                        </ProtectedRoute>
                    }
                />
                {/* 
                <Route
                    path="/admin/collaboration-monitor"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <CollaborationMonitor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/profile"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminProfile />
                        </ProtectedRoute>
                    }
                />
                */}

                {/* Student Routes */}
                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute requiredRole="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/upload-project"
                    element={
                        <ProtectedRoute requiredRole="student">
                            <UploadProject />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/peer-review"
                    element={
                        <ProtectedRoute requiredRole="student">
                            <PeerReview />
                        </ProtectedRoute>
                    }
                />
                {/* 
                <Route
                    path="/student/submit-feedback/:projectId"
                    element={
                        <ProtectedRoute requiredRole="student">
                            <SubmitFeedback />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/collaboration-chat/:groupId"
                    element={
                        <ProtectedRoute requiredRole="student">
                            <CollaborationChat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/view-feedback"
                    element={
                        <ProtectedRoute requiredRole="student">
                            <ViewFeedback />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/profile"
                    element={
                        <ProtectedRoute requiredRole="student">
                            <StudentProfile />
                        </ProtectedRoute>
                    }
                />
                */}

                {/* Feedback Route (Accessible by both Student and Admin) */}
                <Route
                    path="/feedback"
                    element={
                        <ProtectedRoute>
                            <FeedbackPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
