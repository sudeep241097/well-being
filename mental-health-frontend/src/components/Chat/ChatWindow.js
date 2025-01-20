import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import {
  ChatWindowContainer,
  MessagesContainer,
  Message,
  MessageInputContainer,
} from "../../styles/ChatStyles";

const socket = io("http://localhost:8080");

const ChatWindow = () => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const username = localStorage.getItem("username") || "Anonymous";

  useEffect(() => {
    socket.emit("joinRoom", { roomName, username });

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/chat/history/${roomName}`);
        const history = await response.json();
        setMessages(history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [roomName, username]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { room: roomName, sender: username, text: input };
      socket.emit("chatMessage", newMessage);
      setInput("");
    }
  };

  return (
    <ChatWindowContainer>
      <h1>{roomName}</h1>
      <MessagesContainer>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Message key={index}>
              <strong>{msg.sender}:</strong> <span>{msg.text}</span>
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </Message>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>No messages yet. Start the conversation!</p>
        )}
      </MessagesContainer>
      <MessageInputContainer>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </MessageInputContainer>
    </ChatWindowContainer>
  );
};

export default ChatWindow;