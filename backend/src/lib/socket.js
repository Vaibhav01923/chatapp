import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Store online users
const userSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId];
}

const getOnlineUsers = () => {
  return Object.keys(userSocketMap);
};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} is now online`);
  }

  // Emit the list of online users to all connected clients
  io.emit("getOnlineUsers", getOnlineUsers());

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    if (userId && userId !== "undefined") {
      delete userSocketMap[userId];
      console.log(`User ${userId} is now offline`);
    }
    // Emit updated online users list
    io.emit("getOnlineUsers", getOnlineUsers());
  });
});

export { io, app, server, getOnlineUsers };
