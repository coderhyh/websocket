import { Server } from 'socket.io'

module.exports = (io: Server) => {
  io.on('connection', (socket) => {
    socket.emit('connectSuccess', '连接成功')
    socket.on('hehe', (e: string) => {
      console.log(e);
    });
    console.log('a user connected');
  });
}