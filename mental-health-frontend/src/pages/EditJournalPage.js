import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JournalEntryForm from "../components/Journal/JournalEntryForm";

const EditJournalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { journal } = location.state || {};

  if (!journal) {
    return <p>Journal entry not found!</p>;
  }

  const handleEdit = async (updatedJournal) => {
    try {
      const response = await fetch(`http://localhost:8080/journals/${journal.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJournal),
      });

      if (!response.ok) {
        throw new Error("Failed to update journal entry");
      }

      navigate("/journals");
    } catch (error) {
      console.error("Error updating journal entry:", error);
    }
  };

  return <JournalEntryForm initialData={journal} onSubmit={handleEdit} />;
};

export default EditJournalPage;