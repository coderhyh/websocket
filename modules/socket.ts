import { Server } from "socket.io";
interface SendData {
  msg: string
  name: string
  right: boolean
  date: string
}
module.exports = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("connectSuccess", "连接成功");
    // 广播
    socket.on("sendMsg", (e: string) => {
      const sendData: SendData = JSON.parse(e);
      sendData.right = false;
      socket.broadcast.emit("sendMsg", sendData);
    });
  });
};
