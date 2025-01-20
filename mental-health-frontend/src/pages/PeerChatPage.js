import React, { useEffect, useState } from "react";
import ChatRoomList from "../components/Chat/ChatRoomList";

const PeerChatPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await fetch("http://localhost:8080/chat/rooms");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
      <ChatRoomList rooms={rooms} />
  );
};

export default PeerChatPage;