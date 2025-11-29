import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const PublicLayout = ({ children }) => {
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1", children: children }), _jsx(Footer, {})] }));
};
export default PublicLayout;
