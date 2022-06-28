import express, { Express, Request, Response, NextFunction } from "express";
import { Server } from 'socket.io'
import http from 'http'

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:3000","http://localhost:3000", "https://chat.coderhyh.top"]
  }
})
require('./modules/socket')(io)

app.get('/', (req, res) => {
  res.sendStatus(200);
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});


/* import webSocket from 'ws'

// 创建socket服务
const wss = new webSocket.Server({ port: 5000 })

wss.on("connection", function (client) {

    // 接收客户端消息
    client.on("message",function(data){
        wss.clients.forEach(function(item){
            item.send(data.toString());
        })
    })

    client.on("close", function () {
        console.log("关闭连接")
    })
}) */
