import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/auth.js';

// Register a new admin
export const registerAdmin = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }

        // Create new admin
        const admin = new Admin({
            email,
            password,
            name,
            role: role || 'admin',
        });

        await admin.save();

        // Generate token
        const token = generateToken(admin._id, admin.role);

        res.status(201).json({
            message: 'Admin registered successfully',
            admin,
            token,
        });
    } catch (error) {
        console.error('Register admin error:', error);
        res.status(500).json({ error: error.message || 'Failed to register admin' });
    }
};

// Login admin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(admin._id, admin.role);

        res.json({
            message: 'Login successful',
            admin,
            token,
        });
    } catch (error) {
        console.error('Login admin error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.json({ admins });
    } catch (error) {
        console.error('Get all admins error:', error);
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).select('-password');
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json({ admin });
    } catch (error) {
        console.error('Get admin error:', error);
        res.status(500).json({ error: 'Failed to fetch admin' });
    }
};

// Update admin
export const updateAdmin = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;

        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.json({ message: 'Admin updated successfully', admin });
    } catch (error) {
        console.error('Update admin error:', error);
        res.status(500).json({ error: error.message || 'Failed to update admin' });
    }
};

// Delete admin
export const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Delete admin error:', error);
        res.status(500).json({ error: 'Failed to delete admin' });
    }
};
