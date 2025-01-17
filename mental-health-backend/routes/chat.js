import express from 'express';
import chatRooms from '../utils/chatRooms.js';
import ChatMessage from '../models/ChatMessage.js';

const router = express.Router();

// Fetch available chat rooms
router.get('/rooms', (req, res) => {
    res.status(200).json(chatRooms);
});

// Fetch chat history for a room
router.get('/history/:roomId', async (req, res) => {
    const { roomId } = req.params;
    const room = chatRooms.find((r) => r.id === parseInt(roomId));

    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    try {
        const messages = await ChatMessage.find({ room: room.name }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching chat history' });
    }
});

export default router;
