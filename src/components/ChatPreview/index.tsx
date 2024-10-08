import React from "react";
import DisplayImage from "@/components/DisplayImage";
import "./styles/index.scss";

const ChatPreview: React.FC<ChatPreviewProps> = ({
  id,
  chatName = "",
  users,
  lastMessage = "",
  lastMessageDate,
  active = false,
  type = "user",
  category = "other",
  onClick = () => {},
}) => {
  const userId = 1;

  return (
    <div
      className="chat"
      style={{ backgroundColor: active ? "#E4DFFF" : "" }}
      onClick={onClick}
    >
      <div className="chat-preview-image">
        <DisplayImage
          data={
            users[0].profilePic ||
            "https://res.cloudinary.com/dqfvqkqhe/image/upload/v1720151320/no_category.png"
          }
          size="50px"
        />
      </div>
      <div className="chat-preview-info">
        <div className="chat-preview-header">
          <div className="p2 chat-preview-name">{chatName}</div>
          <div className="p2 chat-preview-last-message-date">
            {lastMessageDate}
          </div>
        </div>
        <div className="p2 chat-preview-last-message">{lastMessage}</div>
      </div>
    </div>
  );
};
export default ChatPreview;

type ChatPreviewProps = {
  id: number;

  chatName: string;
  users: User[];
  lastMessage?: string;
  lastMessageDate?: string;
  active: boolean;

  type?: string;
  category?: string;
  onClick: () => void;
};
type User = {
  id: number;
  name: string;
  profilePic: string;
};
