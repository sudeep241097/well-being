import React from "react";
import {
  JournalCardContainer,
  CardTitle,
  CardContent,
  CardFooter,
  EmotionBadge,
  Button,
} from "../../styles/JournalStyles";
import { useNavigate } from "react-router-dom";

const JournalCard = ({ journal, onDelete }) => {
  const navigate = useNavigate();

  return (
    <JournalCardContainer>
      <CardTitle>{journal.title}</CardTitle>
      <EmotionBadge emotion={journal.emotion}>{journal.emotion}</EmotionBadge>
      <CardContent>{journal.content}</CardContent>
      <CardFooter>
        <Button onClick={() => navigate(`/journals/${journal._id}`)}>View</Button>
        <Button danger onClick={() => onDelete(journal._id)}>
          Delete
        </Button>
      </CardFooter>
    </JournalCardContainer>
  );
};

export default JournalCard;