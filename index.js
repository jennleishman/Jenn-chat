const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    socket.on("send name", (username) => {
        io.emit("send name", username);
    });
    socket.on("send message", (chat) => {
        io.emit("send message", chat);
    });
});

server.listen(3000, () => {
    console.log("listening at port 3000");
});