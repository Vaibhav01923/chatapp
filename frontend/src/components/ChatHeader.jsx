import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full h-full">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 p-3 ">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt="Avatar"
            className="object-cover rounded-full size-12 border border-gray-600/60"
          />
        </div>
        <div>
          <div>{selectedUser.fullName}</div>
          <div className="text-sm text-gray-500">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="p-4">
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
