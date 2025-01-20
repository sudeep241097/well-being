import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AppointmentFormContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  SubmitButton,
  SuccessMessage,
  ErrorMessage,
  TherapistHeader,
} from "../../styles/TherapistStyles";

const AppointmentForm = () => {
  const { id } = useParams(); // Therapist ID
  const [therapist, setTherapist] = useState(null); // Therapist details
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch therapist details
    const fetchTherapist = async () => {
      try {
        const response = await fetch(`http://localhost:8080/therapists/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch therapist details");
        }

        const data = await response.json();
        setTherapist(data); // Store therapist details
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTherapist();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8080/therapists/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ therapistId: id, userName, userEmail, preferredDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit appointment request");
      }

      const data = await response.json();
      if (data.message === "Appointment request sent successfully") {
        setSuccessMessage("Appointment request submitted successfully!");
        setTimeout(() => navigate("/therapists"), 3000);
      } else {
        throw new Error("Error sending appointment request");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ background: "#e9f7ef", minHeight: "100vh", padding: "20px" }}>
      {therapist && (
        <TherapistHeader>
          <h2>{therapist.name}</h2>
          <p>Specialization: {therapist.specialization}</p>
        </TherapistHeader>
      )}

      <AppointmentFormContainer>
        <FormTitle>Request Appointment</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Name:</FormLabel>
            <FormInput
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email:</FormLabel>
            <FormInput
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Preferred Date:</FormLabel>
            <FormInput
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Submit</SubmitButton>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </AppointmentFormContainer>
    </div>
  );
};

export default AppointmentForm;