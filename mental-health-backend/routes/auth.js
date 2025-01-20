import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import authenticate from '../middlewares/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists.');
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).send('Internal server error during signup.');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('No user found with the provided email.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Incorrect password.');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        res.status(200).json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).send('Internal server error during login.');
    }
});

// Get User Details Route
router.get('/user', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ name: user.name, email: user.email });
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ message: 'Error fetching user details' });
    }
});

export default router;
