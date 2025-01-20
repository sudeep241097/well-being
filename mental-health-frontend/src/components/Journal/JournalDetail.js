import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  JournalContainer,
  JournalHeader,
  CardTitle,
  CardContent,
  EmotionBadge,
  Button,
} from "../../styles/JournalStyles";
import { useNavigate } from "react-router-dom";

const JournalDetail = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await fetch(`http://localhost:8080/journals/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch journal entry");
        }

        const data = await response.json();
        setJournal(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJournal();
  }, [id]);

  if (error) {
    return <JournalContainer><p style={{ color: "red" }}>{error}</p></JournalContainer>;
  }

  if (!journal) {
    return <JournalContainer><p>Loading...</p></JournalContainer>;
  }

  return (
    <JournalContainer>
      <JournalHeader>Journal Detail</JournalHeader>
      <CardTitle>{journal.title}</CardTitle>
      <EmotionBadge emotion={journal.emotion}>{journal.emotion}</EmotionBadge>
      <CardContent>{journal.content}</CardContent>
      <Button onClick={() => navigate(`/journals/edit/${id}`)}>Edit</Button>
    </JournalContainer>
  );
};

export default JournalDetail;