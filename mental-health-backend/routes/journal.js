import express from "express";
import Journal from "../models/Journal.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new journal entry
router.post("/", authenticate, async (req, res) => {
  const { title, content, emotion } = req.body;

  try {
    const newJournal = new Journal({
      userId: req.user.id, // User ID from the JWT payload
      title,
      content,
      emotion,
    });

    await newJournal.save();
    res.status(201).json({ message: "Journal entry created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating journal entry" });
  }
});

// Fetch all journal entries
router.get("/", authenticate, async (req, res) => {
    const { page = 1, limit = 10, search, emotion } = req.query;
  
    try {
      const filters = { userId: req.user.id, deletedAt: null };
  
      if (search) {
        filters.title = { $regex: search, $options: "i" }; // Case-insensitive search
      }
      if (emotion) {
        filters.emotion = emotion;
      }
  
      const totalEntries = await Journal.countDocuments(filters);
  
      const journals = await Journal.find(filters)
        .sort({ createdAt: -1 }) // Sort by most recent
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      res.status(200).json({ totalEntries, journals });
    } catch (err) {
      res.status(500).json({ error: "Error fetching journal entries" });
    }
  });

// Fetch a single journal entry
// Doesnot delete the journal entry in the database
router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const journal = await Journal.findOne({ _id: id, userId: req.user.id });
        if (!journal) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }
        res.status(200).json(journal);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching journal entry' });
    }
});

// Update a journal entry
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, content, emotion } = req.body;

  try {
    const journal = await Journal.findOneAndUpdate(
      { _id: id, userId: req.user.id, deletedAt: null }, // Ensure the journal belongs to the user
      { title, content, emotion },
      { new: true } // Return the updated document
    );

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    res.status(200).json({ message: "Journal entry updated successfully", journal });
  } catch (err) {
    res.status(500).json({ error: "Error updating journal entry" });
  }
});

// // Soft Delete a journal entry
// router.delete("/:id", authenticate, async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       console.log(`Deleting Journal ID: ${id}, User ID: ${req.user.id}`);
  
//       const journal = await Journal.findOneAndUpdate(
//         { _id: id, userId: req.user.id, deletedAt: null },
//         { deletedAt: new Date() }
//       );
  
//       if (!journal) {
//         console.log("Journal not found or already deleted.");
//         return res.status(404).json({ message: "Journal entry not found" });
//       }
  
//       res.status(200).json({ message: "Journal entry deleted successfully" });
//     } catch (err) {
//       console.error("Error deleting journal:", err);
//       res.status(500).json({ error: "Error deleting journal entry" });
//     }
//   });

//Hard Delete a journal entry
// Permanently delete a journal entry and will delete the journal entry from the database
router.delete("/:id", authenticate, async (req, res) => {
    const { id } = req.params;

    try {
    const journal = await Journal.findOneAndDelete({
        _id: id,
        userId: req.user.id,
    });

    if (!journal) {
        return res.status(404).json({ message: "Journal entry not found" });
    }

    res.status(200).json({ message: "Journal entry permanently deleted" });
    } catch (err) {
    console.error("Error deleting journal:", err);
    res.status(500).json({ error: "Error deleting journal entry" });
    }
});

export default router;