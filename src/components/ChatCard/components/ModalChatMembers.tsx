import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import DisplayImage from "@/components/DisplayImage";
import InputText from "@/components/InputText";
import Checkbox from "@/components/Checkbox";
import "../styles/modalChatMembers.scss";

const ModalChatMembers: React.FC<ModalChatMembersProps> = ({
  title,
  selectedUsers = [],
  setSelectedUsers,
  setOpen,
  createChat,
}) => {
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "user1", profilePic: "https://picsum.photos/200" },
    { id: 2, name: "user2", profilePic: "https://picsum.photos/200" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderUser = (image: string, name: string) => {
    return (
      <div className="modal-chat-members-user-container">
        <div className="modal-chat-members-info-container">
          <DisplayImage
            data={image || "https://picsum.photos/200"}
            size="50px"
          />

          <div className="h3 modal-chat-members-name">{name}</div>
        </div>
        <Checkbox
          isChecked={selectedUsers.some((u) => u?.name === name)}
          onClick={() => {
            const user = users.find((u) => u.name === name);
            const newUserList = selectedUsers.filter(Boolean);
            if (user) {
              const isUserSelected = newUserList.some(
                (u) => u && u.name === user.name
              );
              setSelectedUsers(
                isUserSelected
                  ? newUserList.filter((u) => u.name !== user.name)
                  : [...newUserList, user]
              );
            }
          }}
        />
      </div>
    );
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Reset"
      onNoButtonClick={() => {
        setSelectedUsers([]);
        setSearch("");
      }}
      goButtonText="Save"
      onGoButtonClick={() => {
        // TODO: Add new chat logic
        const chatName = selectedUsers.map((u) => u.name).join(", ");
        createChat(chatName, selectedUsers, "user");
        setOpen(false);
      }}
    >
      <div className="modal-chat-members-body">
        <InputText
          value={search}
          onChange={setSearch}
          placeholder="Search users"
        />
        {filteredUsers.map((user) => renderUser(user.profilePic, user.name))}
      </div>
    </Modal>
  );
};

export default ModalChatMembers;

type ModalChatMembersProps = {
  title: string;
  selectedUsers: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  createChat: (chatName: string, users: User[], type: string) => void;
};

type User = {
  id: number;
  name: string;
  profilePic: string;
};
