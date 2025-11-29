import Student from '../models/Student.js';
import { generateToken } from '../middleware/auth.js';

// Register a new student
export const registerStudent = async (req, res) => {
    try {
        const { email, password, name, studentId, department, year } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ $or: [{ email }, { studentId }] });
        if (existingStudent) {
            return res.status(400).json({
                error: existingStudent.email === email
                    ? 'Student with this email already exists'
                    : 'Student ID already exists'
            });
        }

        // Create new student
        const student = new Student({
            email,
            password,
            name,
            studentId,
            department,
            year,
        });

        await student.save();

        // Generate token
        const token = generateToken(student._id, 'student');

        res.status(201).json({
            message: 'Student registered successfully',
            student,
            token,
        });
    } catch (error) {
        console.error('Register student error:', error);
        res.status(500).json({ error: error.message || 'Failed to register student' });
    }
};

// Login student
export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find student
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await student.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(student._id, 'student');

        res.json({
            message: 'Login successful',
            student,
            token,
        });
    } catch (error) {
        console.error('Login student error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};

// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select('-password');
        res.json({ students });
    } catch (error) {
        console.error('Get all students error:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

// Get student by ID
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('-password');
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ student });
    } catch (error) {
        console.error('Get student error:', error);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
};

// Update student
export const updateStudent = async (req, res) => {
    try {
        const { name, email, studentId, department, year } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (studentId) updateData.studentId = studentId;
        if (department) updateData.department = department;
        if (year) updateData.year = year;

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully', student });
    } catch (error) {
        console.error('Update student error:', error);
        res.status(500).json({ error: error.message || 'Failed to update student' });
    }
};

// Delete student
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Delete student error:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
};
