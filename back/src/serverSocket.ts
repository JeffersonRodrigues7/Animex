import * as dotenv from "dotenv";
import express from "express";
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

dotenv.config();
app.use(cors());

interface commentModel {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  topic_id: number;
  user: {
    username: string;
    profile_image: Buffer;
  };
}

const server: any = http.createServer(app);

const io: any = new Server(server, {
  cors: {
    origin: process.env.SERVER_SOCKET_HOST!,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("new_message", (data: commentModel) => {
    //console.log("tópico modificado", data);
    socket.broadcast.emit("update_topic", data);
    socket.emit("update_topic", data);
  });
});

server.listen(process.env.SERVER_SOCKET_LISTEN_PORT!, () => {
  console.log("Server Socket Running");
});

export { io };
