// server.js
const express = require('express');
const app = express();
 
const server = app.listen(8000, () =>
  console.log('The server is all fired up on port 8000')
);
 
// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

const messages = []

io.on("connection", socket => {
    
    console.log(socket.id)
    socket.on("event_from_client", data =>{
      console.log(data)
      messages.push(data)
      // console.log(messages)
      socket.emit('Welcome',data)
      io.emit('new_message_from_server',messages)
      socket.broadcast.emit("send_data_to_all_other_clients", data)
    });
});

