import io from "socket.io-client";

export const socket = io("http://localhost:3002");
socket.on("connect", () => console.log("[IO] Connect => A new connection has been established"));
