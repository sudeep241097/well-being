import React, { useEffect, useState } from "react";
import TherapistList from "../components/Therapist/TherapistList";

const TherapistSearchPage = () => {
  const [therapists, setTherapists] = useState([]);
  const [error, setError] = useState("");

  // Fetch all therapists on page load
  useEffect(() => {
    const fetchAllTherapists = async () => {
      try {
        const response = await fetch("http://localhost:8080/therapists/search", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch therapists");
        }

        const data = await response.json();
        setTherapists(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllTherapists();
  }, []);

  return (
    <div style={{ padding: "20px", background: "#e9f7ef", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#2d6a4f", marginBottom: "20px" }}>
        Therapist Search
      </h1>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      <TherapistList therapists={therapists} setTherapists={setTherapists} />
    </div>
  );
};

export default TherapistSearchPage;