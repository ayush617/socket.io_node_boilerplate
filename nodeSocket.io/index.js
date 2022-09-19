const express = require("express");
const socket = require("socket.io");


const PORT = 3000;
const app = express();
const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});


app.use(express.static("public"));

// Socket setup
const io = socket(server);
const activeUsers = new Set();
io.on("connection", function (socket) {
    console.log("Made socket connection");
    socket.on("message", function (data) {
        console.log(data)
    });
});

app.get("/staging", (req, res, next) => {
    var socket = io.sockets
    if (socket) {
        socket.emit('refresh',{dashBoard:""});
    }
    res.send({ status:200, response:"All Staging users will be refreshed." })
});

app.get("/production", (req, res, next) => {
    socket.emit('refresh',{dashBoard:""});
    res.send({ status:200, response:"All Production users will be refreshed." })
});