import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types/socket";
import { FriendListMsg, UserInfo, UserList } from "../types/user";
import { Server } from "socket.io";
import tk from "jsonwebtoken";
import sql from "./utils/linkSql";

module.exports = (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  const _users: { [k: string]: string } = {};
  let userInfo: UserInfo;
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    tk.verify(token, "772567615", async (err: any, data: any) => {
      const user: UserInfo = data.userInfo;
      if (err) return next(new Error("无效token"));
      const s = `select * from user_list where userId="${user.userId}"`;
      const sqlData = await sql(s).catch((err) => []);
      if (!sqlData.length) return next(new Error("无效token"));
      socket.data.userInfo = user;
      next();
    });
  });
  io.on("connection", (socket) => {
    const userId = socket.data.userInfo?.userId;
    const curUserId = (_users[userId!] = socket.id);

    console.log("a user connected");
    socket.emit("connectSuccess", "连接成功");
    // 在线人数
    io.emit("userCount", io.engine.clientsCount);
    // 离开
    socket.on("disconnect", (reason) => {
      if (_users[userId!]) delete _users[userId!];
      socket.broadcast.emit("userCount", io.engine.clientsCount);
    });
    // 广播
    socket.on("sendMsg", (sendData, aiteTargets) => {
      if (aiteTargets && aiteTargets.length) {
        aiteTargets.forEach((userId) => {
          socket.to(_users[userId]).emit("contextmenu_avatar", "@AITE_NAME");
        });
      }

      sendData.isMe = false;
      socket.broadcast.emit("sendMsg", sendData);
    });
    // 右键头像 功能
    socket.on("contextmenu_avatar", (options) => {
      const { type } = options;

      io.emit("contextmenu_avatar", type, options); // 发起 launch 接收 receive
    });

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
