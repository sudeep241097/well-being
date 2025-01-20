import express from "express";
import chatRooms from "../utils/chatRooms.js";
import ChatMessage from "../models/ChatMessage.js";

const router = express.Router();

// Fetch available chat rooms
router.get("/rooms", (req, res) => {
  res.status(200).json(chatRooms);
});

// Fetch chat history for a room
router.get("/history/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await ChatMessage.find({ room: roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching chat history:", err.message);
    res.status(500).json({ error: "Error fetching chat history" });
  }
});

export default router;