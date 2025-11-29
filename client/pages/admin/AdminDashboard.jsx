import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
const AdminDashboard = () => {
    const stats = [
        {
            label: "Total Students",
            value: "245",
            icon: _jsx(Users, { className: "h-6 w-6" }),
            color: "bg-blue-100 text-blue-600",
        },
        {
            label: "Active Assignments",
            value: "12",
            icon: _jsx(FileText, { className: "h-6 w-6" }),
            color: "bg-green-100 text-green-600",
        },
        {
            label: "Completed Reviews",
            value: "892",
            icon: _jsx(CheckCircle, { className: "h-6 w-6" }),
            color: "bg-emerald-100 text-emerald-600",
        },
        {
            label: "Pending Reviews",
            value: "34",
            icon: _jsx(Clock, { className: "h-6 w-6" }),
            color: "bg-amber-100 text-amber-600",
        },
    ];
    const recentAssignments = [
        {
            id: 1,
            title: "Group Project: Mobile App",
            students: 24,
            submissions: 20,
            deadline: "Dec 20, 2024",
        },
        {
            id: 2,
            title: "Code Review Assignment",
            students: 30,
            submissions: 28,
            deadline: "Dec 22, 2024",
        },
        {
            id: 3,
            title: "Design Thinking Project",
            students: 18,
            submissions: 15,
            deadline: "Dec 25, 2024",
        },
    ];
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Admin Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Welcome back! Here's your platform overview." })] }), _jsx(Button, { asChild: true, children: _jsx(Link, { to: "/admin/create-assignment", children: "New Assignment" }) })] }), _jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((stat, idx) => (_jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: stat.label }), _jsx("p", { className: "text-3xl font-bold text-foreground mt-2", children: stat.value })] }), _jsx("div", { className: `rounded-lg p-3 ${stat.color}`, children: stat.icon })] }) }, idx))) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-bold text-foreground", children: "Recent Assignments" }), _jsx(Button, { variant: "outline", size: "sm", asChild: true, children: _jsx(Link, { to: "/admin/manage-assignments", children: "View All" }) })] }), _jsx(Card, { className: "overflow-hidden", children: _jsx("div", { className: "divide-y", children: recentAssignments.map((assignment) => (_jsxs("div", { className: "flex items-center justify-between p-6 hover:bg-muted/50 transition-colors", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-foreground", children: assignment.title }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [assignment.submissions, "/", assignment.students, " students submitted"] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: "Deadline" }), _jsx("p", { className: "text-sm text-muted-foreground", children: assignment.deadline })] })] }, assignment.id))) }) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-foreground mb-4", children: "Quick Actions" }), _jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [_jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col p-4", children: _jsxs(Link, { to: "/admin/manage-students", children: [_jsx(Users, { className: "h-6 w-6 mb-2" }), "Manage Students"] }) }), _jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col p-4", children: _jsxs(Link, { to: "/admin/review-submissions", children: [_jsx(CheckCircle, { className: "h-6 w-6 mb-2" }), "Review Submissions"] }) }), _jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col p-4", children: _jsxs(Link, { to: "/admin/collaboration-monitor", children: [_jsx(Users, { className: "h-6 w-6 mb-2" }), "Collaboration Monitor"] }) }), _jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col p-4", children: _jsxs(Link, { to: "/admin/profile", children: [_jsx(AlertCircle, { className: "h-6 w-6 mb-2" }), "View Profile"] }) })] })] })] }) }));
};
export default AdminDashboard;
