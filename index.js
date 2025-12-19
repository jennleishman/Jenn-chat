const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require("path");
app.use(express.static(path.join(__dirname)));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    const username = socket.handshake.auth.username;
    socket.username = username || "Anonymous";
    socket.broadcast.emit("user status", socket.username + "has entered jenn-chat");
    socket.on("send message", (data) => {
        io.emit("send message", {
            name: socket.username,
            text: data.text
        });
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit("user status", socket.username + "has left jenn-chat");
    })
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("listening at port", PORT);
    }
);
