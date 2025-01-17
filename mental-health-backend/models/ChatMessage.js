import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    room: { type: String, required: true }, // Room name
    sender: { type: String, required: true }, // Nickname
    text: { type: String, required: true }, // Message text
    timestamp: { type: Date, default: Date.now }, // Timestamp
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
export default ChatMessage;
