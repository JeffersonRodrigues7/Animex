import express from "express";
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("new_message", (data: any) => {
    console.log("tópico modificado", data);
    socket.broadcast.emit("update_topic", data);
    socket.emit("update_topic", data);
  });
});

server.listen(3002, () => {
  console.log("Server Socket Running");
});

export { io };
