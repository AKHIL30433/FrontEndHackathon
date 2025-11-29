import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Users, ClipboardList, Eye, Users2, MessageSquare, ChevronLeft, ChevronRight, User, Star } from "lucide-react";
import { cn } from "@/lib/utils";
const Sidebar = () => {
    const { userRole } = useAuth();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const adminLinks = [
        { label: "Dashboard", href: "/admin/dashboard", icon: _jsx(LayoutDashboard, { className: "h-4 w-4" }) },
        { label: "Create Assignment", href: "/admin/create-assignment", icon: _jsx(FileText, { className: "h-4 w-4" }) },
        { label: "Manage Students", href: "/admin/manage-students", icon: _jsx(Users, { className: "h-4 w-4" }) },
        {
            label: "Manage Assignments",
            href: "/admin/manage-assignments",
            icon: _jsx(ClipboardList, { className: "h-4 w-4" }),
        },
        {
            label: "Review Submissions",
            href: "/admin/review-submissions",
            icon: _jsx(Eye, { className: "h-4 w-4" }),
            badge: 3,
        },
        {
            label: "Collaboration Monitor",
            href: "/admin/collaboration-monitor",
            icon: _jsx(Users2, { className: "h-4 w-4" }),
        },
        { label: "Feedback", href: "/feedback", icon: _jsx(MessageSquare, { className: "h-4 w-4" }) },
        { label: "Profile", href: "/admin/profile", icon: _jsx(User, { className: "h-4 w-4" }) },
    ];
    const studentLinks = [
        { label: "Dashboard", href: "/student/dashboard", icon: _jsx(LayoutDashboard, { className: "h-4 w-4" }) },
        { label: "Upload Project", href: "/student/upload-project", icon: _jsx(FileText, { className: "h-4 w-4" }) },
        { label: "Peer Review", href: "/student/peer-review", icon: _jsx(Eye, { className: "h-4 w-4" }) },
        {
            label: "View Feedback",
            href: "/student/view-feedback",
            icon: _jsx(MessageSquare, { className: "h-4 w-4" }),
            badge: 2,
        },
        { label: "Feedback System", href: "/feedback", icon: _jsx(Star, { className: "h-4 w-4" }) },
        { label: "Profile", href: "/student/profile", icon: _jsx(User, { className: "h-4 w-4" }) },
    ];
    const links = userRole === "admin" ? adminLinks : studentLinks;
    const isActive = (href) => {
        return location.pathname === href || location.pathname.startsWith(href.split("/").slice(0, -1).join("/") + "/");
    };
    return (_jsx("aside", {
        className: cn("h-full border-r border-border bg-muted/30 transition-all duration-300 ease-in-out", collapsed ? "w-16" : "w-64"), children: _jsxs("div", {
            className: "flex h-full flex-col", children: [_jsx("nav", {
                className: "flex-1 space-y-2 overflow-y-auto p-4", children: links.map((link) => (_jsxs(Link, {
                    to: link.href, className: cn("flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive(link.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"), children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [link.icon, !collapsed && _jsx("span", { className: "truncate", children: link.label })] }), !collapsed && link.badge && (_jsx("span", { className: "inline-flex items-center justify-center rounded-full bg-destructive/20 text-destructive text-xs font-semibold px-2", children: link.badge }))]
                }, link.href)))
            }), _jsx("div", { className: "border-t border-border p-4", children: _jsx(Button, { variant: "ghost", size: "icon", onClick: () => setCollapsed(!collapsed), className: "w-full", title: collapsed ? "Expand" : "Collapse", children: collapsed ? _jsx(ChevronRight, { className: "h-4 w-4" }) : _jsx(ChevronLeft, { className: "h-4 w-4" }) }) })]
        })
    }));
};
export default Sidebar;
