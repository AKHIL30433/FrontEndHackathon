import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
const NotFound = () => {
    const location = useLocation();
    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4", children: _jsxs("div", { className: "max-w-md text-center", children: [_jsx("div", { className: "mb-6 flex justify-center", children: _jsx(AlertCircle, { className: "h-16 w-16 text-destructive" }) }), _jsx("h1", { className: "mb-2 text-5xl font-bold text-foreground", children: "404" }), _jsx("p", { className: "mb-2 text-2xl font-semibold text-foreground", children: "Page Not Found" }), _jsx("p", { className: "mb-8 text-muted-foreground", children: "Sorry, the page you're looking for doesn't exist or has been moved." }), _jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:justify-center", children: [_jsx(Button, { asChild: true, children: _jsx(Link, { to: "/", children: "Return Home" }) }), _jsx(Button, { variant: "outline", asChild: true, children: _jsx(Link, { to: "/login", children: "Sign In" }) })] })] }) }));
};
export default NotFound;
