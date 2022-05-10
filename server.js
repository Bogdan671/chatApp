const express = require('express');
const Socket = require('socket.io');

const app = express();

let port = 3000;

const users = [];

const server = require('http').createServer(app);

const io = Socket(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

server.listen(port, () => {
    console.log(`Listening port: ${port}`);
});

io.on('connection', (socket) => {

    console.log('Connected to', socket.id);

    socket.on('adduser', (username) => {
        socket.user = username;
        users.push(username);
        io.sockets.emit('user', users);
    });

    socket.on('message', (message) => {

        io.sockets.emit('message_client', {
            message: message,
            user: socket.user
        });
    });
});
