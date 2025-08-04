import React, { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeToMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="h-full grid grid-rows-[65px_1fr_auto] text-white">
        <div className="relative bg-gray-800/20 backdrop-blur-lg border-b border-white/10 overflow-hidden">
          <ChatHeader />
        </div>
        <div>
          <MessageSkeleton />
        </div>
        <div>
          <MessageInput />
        </div>
      </div>
    );

  return (
    <div className="h-full flex flex-col text-white">
      <div className="relative h-[65px] bg-gray-800/20 backdrop-blur-lg border-b border-white/10 mt-[64px]">
        <ChatHeader />
      </div>
      {/* {message} */}
      <div className="flex-1 overflow-y-auto p-8 space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              ref={messageEndRef}
              className={`flex ${
                message.senderId === authUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-3 inline-flex gap-2 ${
                  message.senderId === authUser._id ? "flex-row-reverse" : ""
                } ${message.image ? "items-start" : "items-center"} `}
              >
                <div>
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic
                        : selectedUser.profilePic
                    }
                    alt="profile pic"
                    className="size-8 rounded-full"
                  />
                </div>
                <div className="flex flex-col ">
                  {message.image && (
                    <div>
                      <img
                        src={message.image}
                        alt="Img"
                        className=" md:w-[250px] lg:w-[300px] sm:w-[150px] object-cover border-slate-500 border-[4px] bg-slate-500"
                      ></img>
                    </div>
                  )}
                  <div
                    className={`backdrop-blur-sm bg-gray-900/90 max-w-sm ${
                      message.image
                        ? message.text && "rounded-none"
                        : "rounded-md p-2"
                    }`}
                  >
                    {message.image ? (
                      message.text && (
                        <p className="w-[150px] md:w-[250px] lg:w-[300px] p-3">
                          {message.text}
                        </p>
                      )
                    ) : (
                      <span className="p-2">{message.text}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* {message} */}
      <div>
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
