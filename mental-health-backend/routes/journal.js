import express from 'express';
import Journal from '../models/Journal.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new journal entry
router.post('/', authenticate, async (req, res) => {
    const { title, content, emotion } = req.body;

    try {
        const newJournal = new Journal({
            userId: req.user.id, // User ID from the JWT payload
            title,
            content,
            emotion,
        });

        await newJournal.save();
        res.status(201).json({ message: 'Journal entry created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error creating journal entry' });
    }
});

// Fetch all journal entries with pagination
router.get('/', authenticate, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const journals = await Journal.find({ userId: req.user.id })
            .sort({ createdAt: -1 }) // Sort by most recent
            .skip((page - 1) * limit) // Pagination logic
            .limit(parseInt(limit));

        res.status(200).json(journals);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching journal entries' });
    }
});

// Update a journal entry
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, content, emotion } = req.body;

    try {
        const journal = await Journal.findOneAndUpdate(
            { _id: id, userId: req.user.id }, // Ensure the journal belongs to the user
            { title, content, emotion },
            { new: true } // Return the updated document
        );

        if (!journal) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }

        res.status(200).json({ message: 'Journal entry updated successfully', journal });
    } catch (err) {
        res.status(500).json({ error: 'Error updating journal entry' });
    }
});

// Delete a journal entry
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Journal.deleteOne({ _id: id, userId: req.user.id }); // Ensure the journal belongs to the user

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }

        res.status(200).json({ message: 'Journal entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting journal entry' });
    }
});

export default router;
