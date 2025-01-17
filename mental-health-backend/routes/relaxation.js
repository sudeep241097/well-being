import express from 'express';
import RelaxationResource from '../models/RelaxationResource.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

// Fetch all relaxation resources
router.get('/', authenticate, async (req, res) => {
    try {
        const resources = await RelaxationResource.find();
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).send('Error fetching relaxation resources');
    }
});

// Fetch relaxation resources by type
router.get('/:type', authenticate, async (req, res) => {
    const { type } = req.params;

    try {
        const resources = await RelaxationResource.find({ type });
        if (resources.length === 0) {
            return res.status(404).send('No resources found for this type');
        }
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).send('Error fetching resources by type');
    }
});

export default router;
