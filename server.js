const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log('A new client connected');

  socket.on('coordinateUpdate', (data) => {
    // Broadcast the received coordinate update to all connected clients
    socket.broadcast.emit('coordinateUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});