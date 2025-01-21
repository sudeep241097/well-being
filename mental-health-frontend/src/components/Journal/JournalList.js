import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  JournalContainer,
  JournalHeader,
  JournalListWrapper,
  JournalCardContainer,
  CardTitle,
  CardContent,
  CardFooter,
  EmotionBadge,
  Button,
} from "../../styles/JournalStyles";

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const response = await fetch("http://localhost:8080/journals", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch journals");
      }

      const data = await response.json();
      setJournals(data.journals.filter((journal) => journal.deletedAt === null));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      try {
        const response = await fetch(`http://localhost:8080/journals/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete journal");
        }

        fetchJournals();
      } catch (err) {
        alert("Error deleting journal: " + err.message);
      }
    }
  };

  return (
    <JournalContainer>
      <JournalHeader>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>My Journals</h2>
      </JournalHeader>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Button
          style={{
            background: "#2d6a4f",
            color: "#fff",
            fontSize: "16px",
          }}
          onClick={() => navigate("/journals/new")}
        >
          Create New Journal
        </Button>
      </div>
      {journals.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ fontSize: "18px", color: "#555" }}>
            You haven't created any journals yet. Start writing your thoughts
            today!
          </p>
        </div>
      ) : (
        <JournalListWrapper>
          {journals.map((journal) => (
            <JournalCardContainer key={journal._id}>
              <CardTitle>{journal.title}</CardTitle>
              <CardContent>{journal.content}</CardContent>
              <CardFooter>
                <EmotionBadge>{journal.emotion}</EmotionBadge>
                <div>
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => navigate(`/journals/edit/${journal._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ background: "#ff4d4f" }}
                    onClick={() => handleDelete(journal._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </JournalCardContainer>
          ))}
        </JournalListWrapper>
      )}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </JournalContainer>
  );
};

export default JournalList;