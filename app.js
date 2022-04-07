'use strict';

import dotenv from 'dotenv';
import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

dotenv.config();

const app = express();
app.use(express.static('public'));
const http = createServer(app);
const io = new Server(http);
const port = process.env.PORT || 3001;

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  const room = 'test room';
  socket.join(room);

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  socket.on('chat message', (username, msg) => {
    console.log('username:', username);
    console.log('message:', msg);
    io.to(room).emit('chat message', {username, msg});
  });
});

http.listen(port, () => {
  console.log(`Socket.io chat app listening on port ${port}!`);
});


