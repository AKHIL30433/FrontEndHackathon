import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Student from '../models/Student.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Fetch full user object
        let user;
        if (decoded.role === 'admin' || decoded.role === 'super-admin') {
            user = await Admin.findById(decoded.userId).select('-password');
        } else {
            user = await Student.findById(decoded.userId).select('-password');
        }

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        // Add role to req.user if not present in DB model, or rely on decoded role?
        // The model usually has role. If not, we can attach it.
        if (!req.user.role) req.user.role = decoded.role;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};
