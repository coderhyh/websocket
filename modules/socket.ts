import { Server } from "socket.io";

module.exports = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("connectSuccess", "连接成功");
    // 广播
    socket.on("sendMsg", (e: string) => {
      socket.broadcast.emit("sendMsg", e);
    });
  });
};
