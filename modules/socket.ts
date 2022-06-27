import { Server } from 'socket.io'

module.exports = (io: Server) => {
 io.on('connection', (socket) => {
  console.log('a user connected');
});
}