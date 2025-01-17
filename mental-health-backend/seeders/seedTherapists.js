import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Therapist from '../models/Therapist.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedTherapists = async () => {
    const therapists = [
        {
            name: "Dr. John Smith",
            specialization: "Anxiety",
            location: "New York",
            email: "sudeepkatari97@gmail.com",
            phone: "123-456-7890",
        },
        {
            name: "Dr. Emily Davis",
            specialization: "Depression",
            location: "California",
            email: "001.sudeepkumar24@gmail.com",
        },
        {
            name: "Dr. Sarah Lee",
            specialization: "Mindfulness",
            location: "Texas",
            email: "001.sudeepkumar8857@gmail.com",
            phone: "987-654-3210",
        },
    ];

    try {
        await Therapist.insertMany(therapists);
        console.log('Therapists seeded successfully!');
    } catch (err) {
        console.error('Error seeding therapists:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedTherapists();
