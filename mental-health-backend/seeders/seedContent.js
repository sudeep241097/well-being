import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from '../models/Content.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedContent = async () => {
    const articles = [
        {
            title: "Understanding Anxiety: Causes and Symptoms",
            description: "Learn about the common causes and symptoms of anxiety to better understand this condition.",
            category: "Anxiety Management",
            content: `Anxiety is a natural response to stress, but when it becomes excessive, it can interfere with daily life.\n
1. Common causes include genetics, environmental factors, and past trauma.
2. Symptoms include restlessness, rapid heartbeat, excessive worrying, and difficulty concentrating.
3. Understanding these symptoms can help you take the first step toward managing anxiety effectively.
            `,
            link: "https://www.mayoclinic.org/diseases-conditions/anxiety/symptoms-causes/syc-20350961"
        },
        {
            title: "5 Techniques to Reduce Anxiety Quickly",
            description: "Discover practical techniques to calm your mind during anxious moments.",
            category: "Anxiety Management",
            content: `When anxiety strikes, try these techniques:\n
1. Deep Breathing: Take slow, deep breaths to calm your nervous system.
2. Progressive Muscle Relaxation: Tense and relax each muscle group to release physical tension.
3. Grounding Exercises: Focus on the present by using your senses—identify five things you see, four you can touch, etc.
4. Journaling: Write down your worries to declutter your mind.
5. Visualization: Imagine a peaceful scene to redirect your thoughts.
            `,
            link: "https://www.purelycalm.com/10-quick-ways-to-calm-anxiety-in-under-5-minutes/"
        },
        {
            title: "What is Mindfulness and How to Practice It",
            description: "An introduction to mindfulness and how it can transform your mental health.",
            category: "Mindfulness",
            content: `Mindfulness is the practice of being fully present in the moment. It involves observing your thoughts and emotions without judgment.\n
1. To start practicing mindfulness, set aside 5-10 minutes a day to focus on your breathing or perform a body scan meditation.
2. Consistency is key to reaping the benefits, such as reduced stress and increased self-awareness.
            `,
            link: "https://www.healthline.com/health/mind-body/what-is-mindfulness"
        },
        {
            title: "Top 10 Ways to Manage Stress",
            description: "Explore practical ways to reduce stress and maintain balance in your life.",
            category: "Stress Relief",
            content: `Managing stress is crucial for your mental health. Here are 10 ways to reduce stress:\n
1. Exercise regularly to release endorphins.
2. Practice meditation or yoga.
3. Maintain a healthy diet.
4. Get enough sleep.
5. Take breaks during work to recharge.
6. Stay organized to avoid feeling overwhelmed.
7. Spend time with loved ones.
8. Engage in hobbies or creative activities.
9. Limit your screen time.
10. Seek professional help if stress becomes unmanageable.
            `,
            link: "https://www.healthline.com/health/10-ways-to-relieve-stress"
        },
        {
            title: "Recognizing the Signs of Depression",
            description: "Understand the early signs of depression to seek help early.",
            category: "Depression Support",
            content: `Depression affects millions of people worldwide. Early signs include:\n
1. Persistent sadness.
2. Loss of interest in activities.
3. Changes in appetite.
4. Fatigue.
5. Feelings of worthlessness.\n
Recognizing these signs early can help you take steps toward recovery through therapy, medication, or support groups.
Remember, you are not alone, and help is available.
            `,
            link: "https://www.medicalnewstoday.com/articles/326769"
        },
        {
            title: "Coping Strategies for Depression",
            description: "Learn effective strategies to cope with depression.",
            category: "Depression Support",
            content: `Coping with depression requires patience and effort. Try the following:\n
1. Stay physically active, as exercise boosts mood.
2. Maintain a routine to create structure in your day.
3. Connect with supportive friends or family members.
4. Practice gratitude by focusing on positive aspects of life.
5. Seek professional help, such as therapy or counseling.
            `,
            link: "https://www.verywellhealth.com/coping-skills-for-depression-8426424"
        },
        {
            title: "The Importance of Self-Care",
            description: "Why self-care matters for your mental health and how to incorporate it into your routine.",
            category: "Self-Care Tips",
            content: `Self-care is essential for maintaining mental health. It involves activities that recharge your mind and body.\n
1. Examples include taking a relaxing bath, reading a book, or spending time in nature.
2. Remember, self-care is not selfish—it’s necessary for your well-being.
3. Prioritize self-care to prevent burnout and improve your overall quality of life.
            `,
            link: "https://www.verywellhealth.com/what-is-self-care-5212781"
        },
        {
            title: "Building a Healthy Lifestyle for Mental Well-Being",
            description: "Practical tips for creating a lifestyle that supports mental health.",
            category: "Healthy Lifestyle",
            content: `A healthy lifestyle improves both physical and mental health. Incorporate habits such as:\n
1. Eating nutritious meals.
2. Staying hydrated.
3. Exercising regularly.
4. Limiting alcohol and caffeine intake.
5. Practicing mindfulness and gratitude.
            `,
            link: "https://scientificorigin.com/15-healthy-habits-for-mental-well-being-and-happiness"
        }
    ];

    try {
        await Content.insertMany(articles);
        console.log('Content seeded successfully!');
    } catch (err) {
        console.error('Error seeding content:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedContent();