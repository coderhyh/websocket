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