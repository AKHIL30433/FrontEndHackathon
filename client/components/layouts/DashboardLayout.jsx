import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
const DashboardLayout = ({ children }) => {
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex flex-1", children: [_jsx("div", { className: "hidden lg:block", children: _jsx(Sidebar, {}) }), _jsx("main", { className: "flex-1 lg:ml-64 pt-4 pb-8 px-4 sm:px-6 lg:px-8 w-full", children: children }), _jsx("div", { className: "fixed bottom-6 right-6 lg:hidden", children: _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { size: "icon", className: "rounded-full h-12 w-12 shadow-lg", children: _jsx(Menu, { className: "h-5 w-5" }) }) }), _jsx(SheetContent, { side: "left", className: "w-64 p-0", children: _jsx(Sidebar, {}) })] }) })] }), _jsx(Footer, {})] }));
};
export default DashboardLayout;
