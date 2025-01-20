import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import relaxationRoutes from './routes/relaxation.js';
import journalRoutes from './routes/journal.js';
import therapistRoutes from './routes/therapist.js';
import chatRoutes from './routes/chat.js';
import chatRooms from './utils/chatRooms.js';
import ChatMessage from './models/ChatMessage.js';

dotenv.config();
const app = express();
const httpServer = createServer(app);


// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/content', contentRoutes);
app.use('/relaxation', relaxationRoutes);
app.use('/journals', journalRoutes);
app.use('/therapists', therapistRoutes);
app.use('/chat', chatRoutes);

const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Frontend URL
    },
  });
  
  // Socket.IO Event Handling
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    // User joins a chat room
    socket.on("joinRoom", ({ roomName, username }) => {
      socket.join(roomName);
      console.log(`${username} joined room: ${roomName}`);
  
      // Notify the room
      const systemMessage = {
        sender: "System",
        text: `${username} has joined the room.`,
        timestamp: new Date(),
      };
      io.to(roomName).emit("message", systemMessage);
    });
  
    // Handle chat messages
    socket.on("chatMessage", async ({ room, sender, text }) => {
      console.log(`Message in ${room}: ${text} from ${sender}`);
  
      // Save the message to the database
      const message = new ChatMessage({
        room,
        sender,
        text,
      });
      await message.save();
  
      // Broadcast the message to the room
      io.to(room).emit("message", {
        sender,
        text,
        timestamp: message.timestamp,
      });
    });
  
    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
