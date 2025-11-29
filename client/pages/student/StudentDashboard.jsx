import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, FileText, Eye, MessageSquare } from "lucide-react";
const StudentDashboard = () => {
    const tasks = [
        {
            id: 1,
            title: "Group Project: Mobile App",
            deadline: "Dec 20, 2024",
            status: "in_progress",
            daysLeft: 5,
        },
        {
            id: 2,
            title: "Code Review Assignment",
            deadline: "Dec 22, 2024",
            status: "pending",
            daysLeft: 7,
        },
    ];
    const recentFeedback = [
        {
            id: 1,
            from: "Sarah Johnson",
            project: "Mobile App - v2",
            rating: 4.5,
            comment: "Great implementation, needs minor UI improvements",
        },
        {
            id: 2,
            from: "Alex Chen",
            project: "Mobile App - v2",
            rating: 4,
            comment: "Code is clean and well documented",
        },
    ];
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Student Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Track your assignments and feedback" })] }), _jsx(Button, { asChild: true, children: _jsx(Link, { to: "/student/upload-project", children: "Upload Project" }) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-foreground mb-4", children: "Assigned Tasks" }), _jsx("div", { className: "space-y-3", children: tasks.map((task) => (_jsxs(Card, { className: "p-4 flex items-center justify-between hover:shadow-md transition-shadow", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-foreground", children: task.title }), _jsxs("div", { className: "flex items-center gap-4 mt-2 text-sm text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-4 w-4" }), task.daysLeft, " days left"] }), _jsx("span", { children: task.deadline })] })] }), _jsxs("div", { children: [task.status === "in_progress" && (_jsx("span", { className: "inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700", children: "In Progress" })), task.status === "pending" && (_jsx("span", { className: "inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700", children: "Pending" }))] })] }, task.id))) })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [_jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Submissions" }), _jsx("p", { className: "text-3xl font-bold text-foreground mt-2", children: "3" })] }), _jsx(FileText, { className: "h-6 w-6 text-muted-foreground" })] }) }), _jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Peer Reviews" }), _jsx("p", { className: "text-3xl font-bold text-foreground mt-2", children: "5" })] }), _jsx(Eye, { className: "h-6 w-6 text-muted-foreground" })] }) }), _jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Feedback" }), _jsx("p", { className: "text-3xl font-bold text-foreground mt-2", children: "8" })] }), _jsx(MessageSquare, { className: "h-6 w-6 text-muted-foreground" })] }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-bold text-foreground", children: "Recent Feedback" }), _jsx(Button, { variant: "outline", size: "sm", asChild: true, children: _jsx(Link, { to: "/student/view-feedback", children: "View All" }) })] }), _jsx("div", { className: "space-y-3", children: recentFeedback.map((feedback) => (_jsx(Card, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("p", { className: "font-semibold text-foreground", children: [feedback.from, " \u2022 ", feedback.project] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: feedback.comment })] }), _jsx("div", { className: "text-right", children: _jsxs("p", { className: "font-semibold text-foreground", children: [feedback.rating, "/5"] }) })] }) }, feedback.id))) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-foreground mb-4", children: "Quick Actions" }), _jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [_jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col p-4", children: _jsxs(Link, { to: "/student/upload-project", children: [_jsx(FileText, { className: "h-6 w-6 mb-2" }), "Upload Project"] }) }), _jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col p-4", children: _jsxs(Link, { to: "/student/peer-review", children: [_jsx(Eye, { className: "h-6 w-6 mb-2" }), "Review Peer Work"] }) })] })] })] }) }));
};
export default StudentDashboard;
