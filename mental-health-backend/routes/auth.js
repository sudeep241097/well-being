import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Create and save user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error signing up');
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

export default router;
