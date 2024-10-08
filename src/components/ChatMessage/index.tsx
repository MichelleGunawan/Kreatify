import React from "react";
import DisplayImage from "@/components/DisplayImage";
import "./styles/index.scss";

const ChatMessage: React.FC<ChatMessageProps> = ({
  id = -1,
  senderId = -1,
  senderName,
  senderProfilePic,
  message = "",
  dateSent = "Jan 0, 0000",
}) => {
  const userId = 1;
  const isMine = senderId === userId;

  return (
    <div
      className="chat-message"
      style={{ flexDirection: isMine ? "row-reverse" : "row" }}
    >
      {/* <DisplayImage
        data={
          senderProfilePic ||
          "https://res.cloudinary.com/dqfvqkqhe/image/upload/v1720151320/no_category.png"
        }
        size="30px"
      /> */}
      <div className="chat-message-body">
        <div
          className="chat-message-bubble"
          style={{
            backgroundColor: isMine ? "#fff" : "#E4DFFF",
            borderRadius: isMine ? "10px 10px 0 10px" : "10px 10px 10px 0",
          }}
        >
          {!isMine && <h3 className="h3 chat-bubble-name">{senderName}</h3>}
          <p className="p2 chat-bubble-message">{message}</p>
        </div>
        <p className="p3 chat-message-date text-gray-400">{dateSent}</p>
      </div>
    </div>
  );
};
export default ChatMessage;

type ChatMessageProps = {
  id: number;
  senderId: number;
  senderName: string;
  senderProfilePic: string;
  message: string;
  dateSent: string;
};
