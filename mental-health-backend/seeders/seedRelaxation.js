import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RelaxationResource from '../models/RelaxationResource.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedRelaxation = async () => {
    const resources = [
        {
            title: "10-Minute Guided Meditation for Stress Relief",
            description: "A calming meditation to help you relax and de-stress.",
            type: "Video",
            link: "https://www.youtube.com/watch?v=inpok4MKVLM", // YouTube: Calm
        },
        {
            title: "5-Minute Deep Breathing Exercise",
            description: "Follow this 5-minute video to practice deep breathing and reduce stress.",
            type: "Video",
            link: "https://www.youtube.com/watch?v=nmFUDkj1Aq0", // YouTube: Breathing Techniques
        },
        {
            title: "Progressive Muscle Relaxation Exercise",
            description: "Step-by-step instructions for reducing muscle tension.",
            type: "Breathing Exercise",
            instructions: `1. Find a comfortable position.\n2. Start with your toes: tense them for 5 seconds, then release.\n3. Move to your calves, thighs, and upward through your body.\n4. Focus on the release of tension as you relax each muscle group.\n
            `,
        },
        {
            title: "15-Minute Yoga for Relaxation",
            description: "A gentle yoga flow designed to relax your body and mind.",
            type: "Video",
            link: "https://www.youtube.com/watch?v=v7AYKMP6rOE", // YouTube: Yoga with Adriene
        },
        {
            title: "4-7-8 Breathing Technique",
            description: "A simple breathing exercise for relaxation and better sleep.",
            type: "Breathing Exercise",
            instructions: `1. Inhale deeply through your nose for 4 seconds.\n2. Hold your breath for 7 seconds.\n3. Exhale slowly through your mouth for 8 seconds.\n4. Repeat this cycle 4-5 times.\n
            `,
        },
        {
            title: "Relaxing Rain Sounds for Sleep or Study",
            description: "Ambient rain sounds to help you relax, study, or sleep better.",
            type: "Audio",
            link: "https://www.youtube.com/watch?v=lE6RYpe9IT0", // YouTube: Relaxing Rain Sounds
        },
        {
            title: "Body Scan Meditation for Deep Relaxation",
            description: "A body scan meditation to reduce stress and promote relaxation.",
            type: "Video",
            link: "https://www.youtube.com/watch?v=O-6f5wQXSu8", // YouTube: Jon Kabat-Zinn
        },
        {
            title: "1-Hour Relaxing Music for Stress Relief",
            description: "Instrumental music for calming your mind and reducing anxiety.",
            type: "Audio",
            link: "https://www.youtube.com/watch?v=2OEL4P1Rz04", // YouTube: Instrumental
        },
        {
            title: "10-Minute Breathing Meditation for Beginners",
            description: "A beginner-friendly breathing meditation to reduce stress and anxiety.",
            type: "Video",
            link: "https://www.youtube.com/watch?v=ZToicYcHIOU", // YouTube: Great Meditation
        },
        {
            title: "Daily Gratitude Practice",
            description: "Simple instructions for a daily gratitude practice to promote positivity.",
            type: "Breathing Exercise",
            instructions: `1. Sit comfortably in a quiet space.\n2. Close your eyes and take 3 deep breaths.\n3. Reflect on 3 things you're grateful for today.\n4. Write them down in a journal or simply say them aloud.
            `,
        },
    ];

    try {
        await RelaxationResource.insertMany(resources);
        console.log('Relaxation resources seeded successfully!');
    } catch (err) {
        console.error('Error seeding relaxation resources:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedRelaxation();
