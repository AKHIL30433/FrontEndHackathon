import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PublicLayout from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, Mail, Lock, Loader2 } from "lucide-react";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signIn(email, password);
            navigate("/");
        }
        catch (err) {
            setError(err.message || "Failed to login. Please check your credentials.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(PublicLayout, { children: _jsx("div", { className: "flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-lg p-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "mx-auto mb-4 inline-flex rounded-lg bg-primary p-3", children: _jsxs("svg", { className: "h-6 w-6 text-primary-foreground", fill: "currentColor", viewBox: "0 0 20 20", children: [_jsx("path", { d: "M10.5 1.5H5.75A4.25 4.25 0 001.5 5.75v8.5A4.25 4.25 0 005.75 18.5h8.5a4.25 4.25 0 004.25-4.25V9.5" }), _jsx("path", { d: "M6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z", fill: "currentColor", opacity: "0.4" })] }) }), _jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Welcome Back" }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in to your PeerFlow account" })] }), error && (_jsxs("div", { className: "mb-6 flex gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4", children: [_jsx(AlertCircle, { className: "h-5 w-5 flex-shrink-0 text-destructive" }), _jsx("p", { className: "text-sm text-destructive", children: error })] })), _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { id: "email", type: "email", placeholder: "you@example.com", value: email, onChange: (e) => setEmail(e.target.value), disabled: loading, required: true, className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { id: "password", type: "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), disabled: loading, required: true, className: "pl-10" })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "rounded border border-border" }), _jsx("span", { className: "text-muted-foreground", children: "Remember me" })] }), _jsx("a", { href: "#", className: "font-medium text-primary hover:underline", children: "Forgot password?" })] }), _jsx(Button, { type: "submit", className: "w-full", size: "lg", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Signing in..."] })) : ("Sign In") })] }), _jsxs("div", { className: "my-6 flex items-center gap-3", children: [_jsx("div", { className: "flex-1 border-t border-border" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "OR" }), _jsx("div", { className: "flex-1 border-t border-border" })] }), _jsxs("div", { className: "rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 text-xs text-muted-foreground space-y-1", children: [_jsx("p", { className: "font-semibold text-foreground", children: "Demo Credentials:" }), _jsxs("p", { children: [_jsx("strong", { children: "Admin:" }), " admin@example.com / admin123"] }), _jsxs("p", { children: [_jsx("strong", { children: "Student:" }), " student@example.com / student123"] })] }), _jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: ["Don't have an account?", " ", _jsx(Link, { to: "/signup", className: "font-semibold text-primary hover:underline", children: "Sign up here" })] })] }) }) }) }));
};
export default Login;
