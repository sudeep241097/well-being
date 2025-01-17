import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import relaxationRoutes from './routes/relaxation.js';
import journalRoutes from './routes/journal.js';
import therapistRoutes from './routes/therapist.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import chatRoutes from './routes/chat.js';
import chatRooms from './utils/chatRooms.js';
import ChatMessage from './models/ChatMessage.js';

dotenv.config();
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});


// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // User joins a room
    socket.on('joinRoom', ({ roomId, nickname }) => {
        console.log('joinRoom event received:', { roomId, nickname }); 
        const room = chatRooms.find((r) => r.id === roomId);
        if (!room) {
            socket.emit('error', 'Room not found');
            return;
        }

        socket.join(room.name);
        console.log(`${nickname} joined room: ${room.name}`);
        socket.to(room.name).emit('message', {
            sender: 'System',
            text: `${nickname} has joined the room.`,
        });
    });

    // Handle chat messages
    socket.on('chatMessage', async ({ roomId, nickname, text }) => {
        const room = chatRooms.find((r) => r.id === roomId);
        if (!room) {
            socket.emit('error', 'Room not found');
            return;
        }
        
        // Save the message to the database
        const message = new ChatMessage({
        room: room.name,
        sender: nickname,
        text,
        });

        await message.save();

    // Broadcast the message to the room
        io.to(room.name).emit('message', {
            sender: nickname,
            text,
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Middleware
app.use(express.json());
app.use('/content', contentRoutes);
app.use('/relaxation', relaxationRoutes);
app.use('/journals', journalRoutes);
app.use('/therapists', therapistRoutes);
app.use('/chat', chatRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
