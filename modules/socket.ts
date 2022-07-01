import {
  ClientToServerEvents, ServerToClientEvents,
  InterServerEvents, SocketData, FriendListMsg, UserList
} from '../types/socket'
import { Server } from "socket.io";

module.exports =
  (io: Server<ClientToServerEvents, ServerToClientEvents,
    InterServerEvents, SocketData>) => {
    io.on("connection", (socket) => {
      // io.use((socket, next) => {
      //   const username = ;
      //   socket.data.userName = username;
      //   next();
      // })

      console.log("a user connected");
      socket.emit("connectSuccess", "连接成功");
      // 在线人数
      io.emit("userCount", io.engine.clientsCount)
      socket.on("disconnect", (reason) => {
        socket.broadcast.emit("userCount", io.engine.clientsCount)
      });
      // 广播
      socket.on("sendMsg", (sendData, aiteTargets) => {
        if (aiteTargets && aiteTargets.length) {
          aiteTargets.forEach(target => {
            socket.to(target).emit("contextmenu_avatar", '@AITE_NAME');
          });
        }

        sendData.isMe = false;
        socket.broadcast.emit("sendMsg", sendData);
      });
      // 右键头像 功能
      socket.on('contextmenu_avatar', ({ type, target }) => {
        console.log(type, target);
        
        socket.to(target).emit("contextmenu_avatar", type);
      })

      // 所有用户
      const userList: UserList[] = [];
      for (let [id, socket] of io.of("/").sockets) {
        userList.push({
          userId: id,
          userName: socket.handshake.auth.userName,
        });
      }
      io.emit("userList", userList);
    });
  };
