import styled from "styled-components";

export const JournalContainer = styled.div`
  padding: 20px;
  background-color: #e9f7ef;
  min-height: 100vh;
`;

export const JournalHeader = styled.h1`
  text-align: center;
  color: #2d6a4f;
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
`;

export const JournalListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const JournalCardContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  min-width: 250px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  color: #333;
`;

export const CardContent = styled.p`
  font-size: 14px;
  color: #555;
  margin-top: 10px;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const EmotionBadge = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${(props) =>
    props.emotion === "Happy"
      ? "#ffeb3b"
      : props.emotion === "Sad"
      ? "#03a9f4"
      : props.emotion === "Anxious"
      ? "#f44336"
      : "#9e9e9e"};
  padding: 5px 10px;
  border-radius: 8px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #2d6a4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

// Styles for JournalForm
export const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
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
  background: #2d6a4f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  font-size: 16px;

  &:hover {
    background: #45a049;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;