import styled from "styled-components";

export const ChatRoomListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #e9f7ef;
  min-height: 100vh;

  h1 {
    font-size: 32px;
    color: #2d6a4f;
    font-weight: bold;
    margin-bottom: 30px;
    text-shadow: 1px 1px 1px #ccc;
  }
`;

export const ChatRoomButton = styled.button`
  width: 90%;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background: #2d6a4f;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #45a049;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const ChatWindowContainer = styled.div`
  padding: 20px;
  background: #e9f7ef;
  min-height: 100vh;

  h1 {
    font-size: 32px;
    color: #2d6a4f;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    text-shadow: 1px 1px 1px #ccc;
  }
`;

export const MessagesContainer = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2d6a4f;
    border-radius: 4px;
  }
`;

export const Message = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  strong {
    color: #2d6a4f;
    font-weight: bold;
  }

  span {
    margin-left: 10px;
    color: #333;
  }

  small {
    display: block;
    font-size: 12px;
    color: #888;
    margin-left: 10px;
  }
`;

export const MessageInputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #ffffff;
  border-top: 1px solid #ddd;
  border-radius: 5px;

  input {
    flex: 1;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  button {
    padding: 12px 24px;
    background-color: #2d6a4f;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #45a049;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;