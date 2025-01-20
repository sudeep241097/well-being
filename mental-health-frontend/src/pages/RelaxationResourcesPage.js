import React, { useEffect, useState } from "react";
import RelaxationResourcesList from "../components/RelaxationResources/RelaxationResourcesList";
import { PageContainer } from "../styles/RelaxationResourcesStyles";

const RelaxationResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
        try {
          const response = await fetch("http://localhost:8080/relaxation", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }
      
          const data = await response.json();
          setResources(data);
        } catch (err) {
          console.error("Error fetching relaxation resources:", err.message);
          setError("Failed to load relaxation resources. Please try again.");
        } finally {
          setLoading(false);
        }
      };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <h1>Relaxation Resources</h1>
        <p>Loading resources...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <h1>Relaxation Resources</h1>
        <p style={{ color: "red" }}>{error}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1>Relaxation Resources</h1>
      {resources.length > 0 ? (
        <RelaxationResourcesList resources={resources} />
      ) : (
        <p>No resources available at the moment.</p>
      )}
    </PageContainer>
  );
};

export default RelaxationResourcesPage;