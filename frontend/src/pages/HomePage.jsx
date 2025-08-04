import React from "react";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-[calc(100vh-64px)]">
      <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[1fr_2fr] h-full">
        <div className="bg-black-800/20 backdrop-blur-lg">
          <Sidebar />
        </div>
        <div className="h-screen">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
