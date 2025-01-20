import React from "react";
import {
  TherapistCardContainer,
  TherapistDetails,
  AppointmentButton,
} from "../../styles/TherapistStyles";
import { useNavigate } from "react-router-dom";

const TherapistCard = ({ therapist }) => {
  const navigate = useNavigate();

  const handleAppointment = () => {
    navigate(`/appointment/${therapist._id}`);
  };

  return (
    <TherapistCardContainer>
      <TherapistDetails>
        <h3>{therapist.name}</h3>
        <p>
          <strong>Specialization:</strong> {therapist.specialization}
        </p>
        <p>
          <strong>Location:</strong> {therapist.location}
        </p>
        <p>
          <strong>Email:</strong> {therapist.email}
        </p>
        {therapist.phone && (
          <p>
            <strong>Phone:</strong> {therapist.phone}
          </p>
        )}
      </TherapistDetails>
      <AppointmentButton onClick={handleAppointment}>
        Request Appointment
      </AppointmentButton>
    </TherapistCardContainer>
  );
};

export default TherapistCard;