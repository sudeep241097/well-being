// import express from 'express';
// import Content from '../models/Content.js';
// import authenticate from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Get all articles
// router.get('/', authenticate, async (req, res) => {
//     try {
//         const articles = await Content.find();
//         res.status(200).json(articles);
//     } catch (err) {
//         res.status(500).send('Error fetching content');
//     }
// });

// // Get articles by category
// router.get('/:category', authenticate, async (req, res) => {
//     const { category } = req.params;
//     try {
//         const articles = await Content.find({ category });
//         if (articles.length === 0) {
//             return res.status(404).send('No articles found in this category');
//         }
//         res.status(200).json(articles);
//     } catch (err) {
//         res.status(500).send('Error fetching articles by category');
//     }
// });

// export default router;


import express from 'express';
import Content from '../models/Content.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all articles
router.get('/', authenticate, async (req, res) => {
    try {
        const articles = await Content.find();
        res.status(200).json(articles);
    } catch (err) {
        console.error('Error fetching content:', err.message);
        res.status(500).send('Error fetching content');
    }
});

// Get articles by category
router.get('/:category', authenticate, async (req, res) => {
    const { category } = req.params;
    try {
        const articles = await Content.find({ category });
        if (articles.length === 0) {
            return res.status(404).send('No articles found in this category');
        }
        res.status(200).json(articles);
    } catch (err) {
        console.error('Error fetching articles by category:', err.message);
        res.status(500).send('Error fetching articles by category');
    }
});

// Search articles by title or description
router.get('/search/:query', authenticate, async (req, res) => {
    const { query } = req.params;
    try {
        const articles = await Content.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        });
        if (articles.length === 0) {
            return res.status(404).send('No articles matched your search query');
        }
        res.status(200).json(articles);
    } catch (err) {
        console.error('Error searching articles:', err.message);
        res.status(500).send('Error searching articles');
    }
});

export default router;
