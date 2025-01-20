import React from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomListContainer, ChatRoomButton } from "../../styles/ChatStyles";

const ChatRoomList = ({ rooms }) => {
  const navigate = useNavigate();

  const handleRoomClick = (room) => {
    navigate(`/chat/${room.name}`);
  };

  return (
    <ChatRoomListContainer>
      <h1>Join a Chat Room</h1>
      {rooms.map((room) => (
        <ChatRoomButton key={room.id} onClick={() => handleRoomClick(room)}>
          {room.name}
        </ChatRoomButton>
      ))}
    </ChatRoomListContainer>
  );
};

export default ChatRoomList;