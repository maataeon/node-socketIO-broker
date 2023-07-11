let logs = [];

const express = require('express');
const https = require('https');
const options = {
  key: `-----BEGIN PRIVATE KEY-----
Your private key content here
-----END PRIVATE KEY-----`,
  cert: `-----BEGIN CERTIFICATE-----
Your certificate content here
-----END CERTIFICATE-----`,
};
const app = express();

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A new client connected', {socket});

  socket.emit('logs', logs);

  socket.on('coordinateUpdate', (data) => {
    // Broadcast the received coordinate update to all connected clients
    logs.push(data);
    socket.broadcast.emit('coordinateUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

const port = process.env.PORT | 3000;
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});