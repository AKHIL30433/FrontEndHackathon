import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, Link } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
const CollaborationChat = () => {
    const { groupId } = useParams();
    const [message, setMessage] = useState("");
    const [messages] = useState([
        { id: 1, author: "You", content: "Hey team, I finished the UI design", timestamp: "10:30 AM" },
        { id: 2, author: "Sarah", content: "Great! I'll integrate it with the backend", timestamp: "10:35 AM" },
    ]);
    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log("Message sent:", message);
        setMessage("");
    };
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", size: "icon", asChild: true, children: _jsx(Link, { to: "/student/dashboard", children: _jsx(ArrowLeft, { className: "h-4 w-4" }) }) }), _jsxs("h1", { className: "text-3xl font-bold text-foreground", children: ["Group Chat - Project ", groupId] })] }), _jsxs(Card, { className: "p-6 h-96 flex flex-col", children: [_jsx("div", { className: "flex-1 overflow-y-auto space-y-4 mb-4", children: messages.map((msg) => (_jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold", children: msg.author.charAt(0) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold text-sm text-foreground", children: msg.author }), _jsx("p", { className: "text-sm text-muted-foreground", children: msg.content }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: msg.timestamp })] })] }, msg.id))) }), _jsxs("form", { onSubmit: handleSendMessage, className: "flex gap-2 border-t pt-4", children: [_jsx(Input, { placeholder: "Type a message...", value: message, onChange: (e) => setMessage(e.target.value), required: true }), _jsx(Button, { type: "submit", size: "icon", children: _jsx(Send, { className: "h-4 w-4" }) })] })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Group Members" }), _jsx("div", { className: "space-y-2", children: ["You", "Sarah", "John", "Emma"].map((member) => (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded hover:bg-muted", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-primary/20" }), _jsx("span", { className: "text-sm", children: member })] }, member))) })] })] }) }));
};
export default CollaborationChat;
