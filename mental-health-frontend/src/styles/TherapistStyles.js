import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 25%;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background: #2d6a4f;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

export const TherapistCardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 10px auto;
  max-width: 600px;
  background: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

export const TherapistDetails = styled.div`
  margin-bottom: 10px;

  h3 {
    color: #2d6a4f;
  }
`;

export const AppointmentButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  color: #fff;
  background: #2d6a4f;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

export const TherapistListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

export const TherapistHeader = styled.div`
  text-align: center;
  background: #e9f7ef;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;

  h2 {
    color: #2d6a4f;
    font-size: 24px;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #555;
  }
`;

export const AppointmentFormContainer = styled.div`
  background: #ffffff; /* White background for the form */
  padding: 40px;
  border-radius: 12px;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #dcdcdc;
`;

export const FormTitle = styled.h1`
  text-align: center;
  color: #2d6a4f; /* Consistent with the app's color palette */
  margin-bottom: 30px;
  font-family: "Arial", sans-serif;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border-color: #2d6a4f;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.4);
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 25px;
  background: #2d6a4f; /* Consistent green color */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  font-size: 16px;
  font-family: "Arial", sans-serif;

  &:hover {
    background: #45a049;
  }
`;

export const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;