import mongoose from 'mongoose';

const relaxationResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'Video', 'Breathing Exercise'
    link: { type: String }, // External link (e.g., YouTube video)
    instructions: { type: String }, // For exercises (optional)
    createdAt: { type: Date, default: Date.now },
});

const RelaxationResource = mongoose.model('RelaxationResource', relaxationResourceSchema);
export default RelaxationResource;
