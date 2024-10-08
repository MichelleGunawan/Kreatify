import React from "react";

//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import ChatCard from "@/components/ChatCard";

//CSS import
import "@/styles/chat.page.scss";

const ChatPage = () => {
  return (
    <LoggedinLayout headerTitle="Chat">
      <ChatCard />
    </LoggedinLayout>
  );
};

export default ChatPage;
