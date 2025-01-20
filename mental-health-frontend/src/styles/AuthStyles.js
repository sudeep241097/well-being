import styled from 'styled-components';

export const AuthCard = styled.div`
    width: 400px;
    padding: 30px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15); /* Slightly deeper shadow */
    text-align: center;

    h2 {
        font-size: 1.8rem;
        margin-bottom: 20px;
        color: #333;
        font-family: 'Roboto', sans-serif;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    input {
        padding: 12px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        outline: none;
        transition: border-color 0.3s ease;

        &:focus {
            border-color: #4caf50;
        }
    }

    button {
        padding: 12px;
        font-size: 1rem;
        color: white;
        background: linear-gradient(90deg, #28a745, #218838);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
        transition: background 0.3s ease;

        &:hover {
            background: linear-gradient(90deg, #218838, #28a745);
        }
    }
`;

export const ToggleText = styled.p`
    margin-top: 15px;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
    font-family: 'Roboto', sans-serif;

    &:hover {
        color: #0056b3;
        text-decoration: none;
    }
`;
