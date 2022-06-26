import webSocket from 'ws'

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
})


// import express, { Express, Request, Response, NextFunction } from "express";

// const app: Express = express();
// app.use("*", (req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
// app.listen(5678, () => console.log("http:/localhost:5678"));
