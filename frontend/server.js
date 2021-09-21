require('dotenv').config()
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app  = express();
const server = http.createServer(app);
const port = process.env.PORT

const {addUser, getUser } = require('./users');
app.use(cors())

// Socket setup
const io = socketio(server);

io.on("connection",  socket => {
    socket.on('newUser', ({name, room}, callback) => {
        const {error, user} = addUser({id : socket.id, name : name, room: room})
        
        if(error) return callback(error)

        socket.join(user.room)  //to join room without room not connect with specific person

        socket.emit('message', {message: `${user.name}, welcome to room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { message : `${user.name} has joined!` });
        
        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    })

    socket.on('sendMessage', message =>  {
         const user = getUser(socket.id)  //find clienData.room from array then send message
         
         if(message) io.to(user.room).emit('message', { user: `${user.name}`, message : `${message}` })
    })
  });


server.listen(port, () =>{
    console.log(`port is running ${port}`)
})
