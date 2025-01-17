import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String }, // Optional link to an external resource
    createdAt: { type: Date, default: Date.now },
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
