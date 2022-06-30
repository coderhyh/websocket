import { Server } from "socket.io";
interface FriendListMsg {
  msg: string
  name: string
  isMe: boolean
  date: string
  type: 'image' | 'text'
}
module.exports = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("connectSuccess", "连接成功");
    // 广播
    socket.on("sendMsg", (sendData: FriendListMsg) => {
      sendData.isMe = false;
      socket.broadcast.emit("sendMsg", sendData);
    });
  });
};
