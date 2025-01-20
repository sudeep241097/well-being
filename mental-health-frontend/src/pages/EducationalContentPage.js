import React, { useEffect, useState } from "react";
import EducationalContentList from "../components/EducationalContent/EducationalContentList";
import { PageContainer } from "../styles/EducationalContentStyles";
import { useNavigate } from "react-router-dom";

const EducationalContentPage = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch educational content from the backend
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch("http://localhost:8080/content", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch educational content");
        }

        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching educational content:", error);
        setError("Failed to load educational content. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [navigate]);

  return (
    <PageContainer>
      {loading ? (
        <p>Loading educational content...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <EducationalContentList content={content} />
      )}
    </PageContainer>
  );
};

export default EducationalContentPage;
