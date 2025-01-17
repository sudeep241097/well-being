import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true }, // e.g., Anxiety, Depression
    location: { type: String, required: true }, // e.g., city or region
    email: { type: String, required: true, unique: true }, // Therapist's email
    phone: { type: String }, // Optional phone number
});

const Therapist = mongoose.model('Therapist', therapistSchema);
export default Therapist;
