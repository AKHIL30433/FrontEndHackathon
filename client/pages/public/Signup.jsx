import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PublicLayout from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, Mail, Lock, User, Loader2 } from "lucide-react";
const Signup = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        if (!displayName || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        try {
            await signUp(email, password, displayName, role);
            navigate(role === "admin" ? "/admin/dashboard" : "/student/dashboard");
        }
        catch (err) {
            setError(err.message || "Failed to create account. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(PublicLayout, { children: _jsx("div", { className: "flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-8", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-lg p-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "mx-auto mb-4 inline-flex rounded-lg bg-primary p-3", children: _jsxs("svg", { className: "h-6 w-6 text-primary-foreground", fill: "currentColor", viewBox: "0 0 20 20", children: [_jsx("path", { d: "M10.5 1.5H5.75A4.25 4.25 0 001.5 5.75v8.5A4.25 4.25 0 005.75 18.5h8.5a4.25 4.25 0 004.25-4.25V9.5" }), _jsx("path", { d: "M6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z", fill: "currentColor", opacity: "0.4" })] }) }), _jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Create Account" }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Join PeerFlow and start collaborating" })] }), error && (_jsxs("div", { className: "mb-6 flex gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4", children: [_jsx(AlertCircle, { className: "h-5 w-5 flex-shrink-0 text-destructive" }), _jsx("p", { className: "text-sm text-destructive", children: error })] })), _jsxs("form", { onSubmit: handleSignup, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { id: "name", type: "text", placeholder: "John Doe", value: displayName, onChange: (e) => setDisplayName(e.target.value), disabled: loading, required: true, className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { id: "email", type: "email", placeholder: "you@example.com", value: email, onChange: (e) => setEmail(e.target.value), disabled: loading, required: true, className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Account Type" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("label", { className: `flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-all ${role === "student"
                                                        ? "border-primary bg-primary/10"
                                                        : "border-border bg-muted hover:border-primary/50"}`, children: [_jsx("input", { type: "radio", name: "role", value: "student", checked: role === "student", onChange: (e) => setRole(e.target.value), disabled: loading, className: "cursor-pointer" }), _jsx("span", { className: "text-sm font-medium", children: "Student" })] }), _jsxs("label", { className: `flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-all ${role === "admin"
                                                        ? "border-primary bg-primary/10"
                                                        : "border-border bg-muted hover:border-primary/50"}`, children: [_jsx("input", { type: "radio", name: "role", value: "admin", checked: role === "admin", onChange: (e) => setRole(e.target.value), disabled: loading, className: "cursor-pointer" }), _jsx("span", { className: "text-sm font-medium", children: "Teacher" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { id: "password", type: "password", placeholder: "Enter a strong password", value: password, onChange: (e) => setPassword(e.target.value), disabled: loading, required: true, className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirm-password", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { id: "confirm-password", type: "password", placeholder: "Confirm your password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), disabled: loading, required: true, className: "pl-10" })] })] }), _jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [_jsx("input", { type: "checkbox", required: true, className: "rounded border border-border" }), _jsxs("span", { className: "text-muted-foreground", children: ["I agree to the", " ", _jsx("a", { href: "#", className: "font-medium text-primary hover:underline", children: "Terms of Service" }), " ", "and", " ", _jsx("a", { href: "#", className: "font-medium text-primary hover:underline", children: "Privacy Policy" })] })] }), _jsx(Button, { type: "submit", className: "w-full", size: "lg", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Creating account..."] })) : ("Create Account") })] }), _jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "font-semibold text-primary hover:underline", children: "Sign in here" })] })] }) }) }) }));
};
export default Signup;
