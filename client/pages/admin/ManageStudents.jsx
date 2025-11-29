import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
const ManageStudents = () => {
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Manage Students" }), _jsx(Button, { children: "Add Student" })] }), _jsx(Card, { className: "p-8", children: _jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [_jsx(Users, { className: "h-12 w-12 text-muted-foreground mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "Manage Students" }), _jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "View and manage all enrolled students on this page." }), _jsx(Input, { placeholder: "Search students...", className: "max-w-xs" })] }) })] }) }));
};
export default ManageStudents;
