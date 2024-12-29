const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (frontend)
app.use(express.static("../client"));

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages from the client
  socket.on("chat message", (msg) => {
    console.log("Message received: " + msg);
    io.emit("chat message", msg); // Broadcast to all clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
