import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  JournalContainer,
  FormGroup,
  FormLabel,
  FormInput,
  SubmitButton,
  ErrorMessage,
} from "../../styles/JournalStyles";

const JournalForm = () => {
  const { id } = useParams(); // Journal ID for editing
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("Neutral");
  const [error, setError] = useState("");
  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      fetchJournalDetails();
    }
  }, [id]);

  const fetchJournalDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/journals/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch journal details");
      }

      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setEmotion(data.emotion);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = { title, content, emotion };
    const url = isEditing
      ? `http://localhost:8080/journals/${id}`
      : "http://localhost:8080/journals";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to process the request");
      }

      navigate("/journals");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <JournalContainer>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>
          {isEditing ? "Edit Journal" : "Create a New Journal"}
        </h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Title:</FormLabel>
            <FormInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Content:</FormLabel>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="5"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            ></textarea>
          </FormGroup>
          <FormGroup>
            <FormLabel>Emotion:</FormLabel>
            <select
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <option value="Neutral">Neutral</option>
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Anxious">Anxious</option>
            </select>
          </FormGroup>
          <div style={{ textAlign: "center" }}>
            <SubmitButton type="submit">
              {isEditing ? "Update" : "Submit"}
            </SubmitButton>
          </div>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </JournalContainer>
  );
};

export default JournalForm;