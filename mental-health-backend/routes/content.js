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
        res.status(500).send('Error fetching articles by category');
    }
});

export default router;
