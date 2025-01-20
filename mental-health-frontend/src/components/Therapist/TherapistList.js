import React, { useState, useEffect } from "react";
import TherapistCard from "./TherapistCard";
import {
  SearchContainer,
  SearchInput,
  SearchButton,
  ErrorMessage,
  TherapistListContainer,
} from "../../styles/TherapistStyles";

const TherapistList = ({ therapists, setTherapists }) => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [error, setError] = useState("");

  // Filter therapists dynamically as the user types
  useEffect(() => {
    const filterResults = () => {
      let filtered = therapists;

      if (name) {
        filtered = filtered.filter((therapist) =>
          therapist.name.toLowerCase().includes(name.toLowerCase())
        );
      }
      if (specialization) {
        filtered = filtered.filter((therapist) =>
          therapist.specialization.toLowerCase().includes(specialization.toLowerCase())
        );
      }
      if (location) {
        filtered = filtered.filter((therapist) =>
          therapist.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      setFilteredTherapists(filtered);
    };

    filterResults();
  }, [name, specialization, location, therapists]);

  // Manual search button click
  const handleSearch = async () => {
    setError("");

    try {
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (specialization) params.append("specialization", specialization);
      if (location) params.append("location", location);

      const response = await fetch(
        `http://localhost:8080/therapists/search?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch therapists");
      }

      const data = await response.json();
      setTherapists(data);
      setFilteredTherapists(data); // Update the filtered list to match the fetched data
    } catch (err) {
      setError(err.message);
      setTherapists([]);
      setFilteredTherapists([]);
    }
  };

  return (
    <div>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Search by Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Search by Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TherapistListContainer>
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist) => (
            <TherapistCard key={therapist._id} therapist={therapist} />
          ))
        ) : (
          <p style={{ color: "red" }}>No therapists found. Try a different search!</p>
        )}
      </TherapistListContainer>
    </div>
  );
};

export default TherapistList;