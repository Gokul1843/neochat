require("dotenv").config();
const mongoose = require("mongoose");


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected 🚀");

  socket.on("send_message", (data) => {
    socket.broadcast.emit(
      "receive_message",
      data
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected ❌");
  });
});

server.listen(5000, () => {
  console.log(
    "Server running on port 5000 🚀"
  );
});