import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { connectDB } from "./db/database.js";
import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/student.js";
import feedbackRoutes from "./routes/feedback.js";
import assignmentRoutes from "./routes/assignment.js";

export function createServer() {
    const app = express();

    // Connect to MongoDB
    connectDB().catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Example API routes
    app.get("/api/ping", (_req, res) => {
        const ping = process.env.PING_MESSAGE ?? "ping";
        res.json({ message: ping });
    });
    app.get("/api/demo", handleDemo);

    // Admin and Student routes
    app.use("/api/admin", adminRoutes);
    app.use("/api/student", studentRoutes);
    app.use("/api/feedback", feedbackRoutes);
    app.use("/api/assignments", assignmentRoutes);

    // Serve uploaded files
    app.use('/uploads', express.static('uploads'));

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('Server error:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    });

    return app;
}
