require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const socketio = require('socket.io')
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: '*',
    }
});
const port = process.env.PORT || 5000

const { addUser, getUsersInRoom, getUser} = require('./User')
const router = require('./routes/router');

app.use(cors())
app.use(router);


io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        
      const {error, user} = addUser({ id: socket.id, name: name, room: room });

      if(error) return callback(error)
  
       socket.join(user?.room);
       console.log(user, "USER")


       socket.emit('message', {user: 'admin', text: `${user.name}, welcome to room ${user?.room}.` })
       socket.broadcast.to(user?.room).emit('message',{ user: 'admin', text: `${user?.name} has joined!` })

       io.to(user?.room).emit('roomData', {room: user?.room, users: getUsersInRoom(user?.room) })

       callback();
    })

socket.on('sendMessage', (message, callback) =>{
    const user = getUser(socket?.id)
    console.log(message, "MESSAGGE")
    
    io.to(user?.room).emit('message', { user: user?.name, text: message });

    callback();
})


})


server.listen(port, () =>{
    console.log(`port is running ${port}`)
})