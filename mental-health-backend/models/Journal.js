import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID to link journal to a user
    title: { type: String, required: true },
    content: { type: String, required: true },
    emotion: { type: String, enum: ["Happy", "Sad", "Anxious", "Neutral"], default: "Neutral" }, // Emotion tagging
    deletedAt: { type: Date, default: null }, // Soft delete functionality
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

const Journal = mongoose.model("Journal", journalSchema);
export default Journal;