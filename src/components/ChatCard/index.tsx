"use client";
import React, { useState } from "react";
import ChatMessage from "../ChatMessage";
import ChatPreview from "../ChatPreview";
import ModalChatMembers from "./components/ModalChatMembers";
import InputText from "../InputText";
import Button from "../Button";
import Icon from "../Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import { chatsData, chatData } from "@/data/Chat.data";
import "./styles/index.scss";
import { COLORS } from "@/utils/constants";

const ChatCard: React.FC<ChatCardProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(1);
  const [modalChatMembersOpen, setModalChatMembersOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const userId = 1;
  const [chats, setChats] = useState(chatsData); // TODO: get chats from API
  const [messages, setMessages] = useState(chatData.messages); // TODO: get messages from API

  const filteredChats = chats.filter((chat) =>
    chat.chatName.toLowerCase().includes(search.toLowerCase())
  );

  const createChat = (chatName: string, users: User[], type: string) => {
    const newChat = {
      id: Math.random(),
      chatName,
      users,
      lastMessage: "",
      lastMessageDate: "",
      type,
    };

    const newChats = [newChat, ...chats];
    setChats(newChats);
    setSelectedUsers([]);
  };

  return (
    <div className="chat-card">
      <div className="chat-card-left">
        <div className="chat-card-left-header">
          <InputText value={search} onChange={setSearch} placeholder="Search" />
          <Button
            icon={getIconLink("add")}
            color="#fff"
            backgroundColor={COLORS.PRIMARY}
            width="48px"
            height="48px"
            borderRadius="10px"
            onClick={() => setModalChatMembersOpen(true)}
          />
        </div>
        <div className="chat-card-left-body">
          {filteredChats.map((chat) => (
            <ChatPreview
              key={chat.id}
              {...chat}
              active={activeChat === chat.id}
              onClick={() => setActiveChat(chat.id)}
            />
          ))}
        </div>
      </div>
      <div className="chat-card-right">
        <div className="chat-card-right-header">
          <h1 className="h1 text-black">Chat Title</h1>
          <div className="hat-card-right-header-right">
            <Icon
              link={getIconLink("attachment")}
              size={24}
              onClick={() => {}}
              color="#a4a4a4"
            />
            <Icon
              link={getIconLink("info")}
              size={40}
              onClick={() => {
                setSelectedUsers(chatData.users);
                setModalChatMembersOpen(true);
              }}
              color="#a4a4a4"
            />
          </div>
        </div>
        <div className="chat-card-right-body">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </div>

        <div className="chat-card-right-footer">
          <Icon
            link={getIconLink("attachment")}
            size={24}
            onClick={() => {}}
            color="#a4a4a4"
          />
          <InputText
            value={message}
            onChange={setMessage}
            placeholder="Type a message"
          />
          <Button
            icon={getIconLink("next")}
            onClick={() => {
              setMessages([
                ...messages,
                {
                  id: 5,
                  senderId: 1,
                  senderName: "user1",
                  senderProfilePic: "https://picsum.photos/200",
                  message: message,
                  dateSent: "Jan 0, 0000",
                },
              ]);
              setMessage("");
            }}
            color="#fff"
            backgroundColor={COLORS.PRIMARY}
            width="40px"
            height="40px"
            borderRadius="100px"
          />
        </div>
      </div>
      {modalChatMembersOpen && (
        <ModalChatMembers
          title="Select Chat Members"
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          setOpen={setModalChatMembersOpen}
          createChat={(chatName: string, users: User[], type: string) =>
            createChat(chatName, users, type)
          }
        />
      )}
    </div>
  );
};
export default ChatCard;

type ChatCardProps = {};
type User = {
  id: number;
  name: string;
  profilePic: string;
};
