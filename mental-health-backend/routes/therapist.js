import express from 'express';
import Therapist from '../models/Therapist.js';
import nodemailer from 'nodemailer';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/search', authenticate, async (req, res) => {
    const { name, specialization, location } = req.query;

    // Construct filter dynamically
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (specialization) filter.specialization = { $regex: specialization, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };

    try {
        const therapists = await Therapist.find(filter);
        res.status(200).json(therapists);
    } catch (err) {
        console.error('Error fetching therapists:', err.message);
        res.status(500).json({ error: 'Error fetching therapists' });
    }
});

// Submit appointment request
router.post('/appointment', authenticate, async (req, res) => {
    const { therapistId, userName, userEmail, preferredDate } = req.body;

    try {
        const therapist = await Therapist.findById(therapistId);
        if (!therapist) {
            return res.status(404).json({ message: 'Therapist not found' });
        }

        // Send appointment request email
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: therapist.email,
            subject: `Appointment Request from ${userName}`,
            text: `
                You have received an appointment request:
                - User: ${userName}
                - Email: ${userEmail}
                - Preferred Date: ${preferredDate}

                Please reach out to the user directly to confirm the appointment.
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Appointment request sent successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error sending appointment request' });
    }
});

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const therapist = await Therapist.findById(id);
        if (!therapist) {
            return res.status(404).json({ message: 'Therapist not found' });
        }
        res.status(200).json(therapist);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching therapist details' });
    }
});

export default router;