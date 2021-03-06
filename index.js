const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require('dotenv').config();

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // receive message data from client
  socket.on('chat', (data)=> {
      console.log(data);
    // send message to show client side 
    io.emit('showChat', data)
  })


});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});