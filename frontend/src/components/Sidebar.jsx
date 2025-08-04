import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-[calc(100vh-64px)] mt-[64px] w-20 lg:w-full border-r border-white/10 flex flex-col transition-all duration-200 text-white">
      <div className="border-b border-white/10 w-full p-5 ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>

          {/* Online toggle filter */}
          <button
            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            className={`
              w-full lg:w-auto px-2 py-1 rounded-full text-xs font-medium transition-colors
              ${
                showOnlineOnly
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }
            `}
          >
            <span className="lg:inline hidden">
              {showOnlineOnly ? "Show All" : "Online Only"}
            </span>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 ">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-gray-700/20 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-gray-900/90 ring-1 ring-gray-600"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {/* Online status indicator */}
              <div
                className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-gray-800 ${
                  onlineUsers.includes(user._id)
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              />
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {showOnlineOnly ? "No online users" : "No users found"}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
