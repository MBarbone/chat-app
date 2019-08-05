const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New WebSocket connection");
  socket.broadcast.emit("message", "A new user has joined the chat.");

  socket.emit("message", "Welcome to the Chat");
  socket.on("sendMessage", message => {
    io.emit("message", message);
  });

  socket.on("sendLocation", coords => {
    io.emit(
      "message",
      `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left.");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
