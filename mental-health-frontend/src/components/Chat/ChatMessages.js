import React from "react";
import { MessagesContainer } from "../../styles/ChatStyles";

const ChatMessages = ({ messages }) => {
  return (
    <MessagesContainer>
      {messages.map((message, index) => (
        <div key={index} className="message">
          <span className="sender">{message.sender}:</span>
          <span className="text">{message.text}</span>
        </div>
      ))}
    </MessagesContainer>
  );
};

export default ChatMessages;