// Establish a connection with the server
const socket = io();

// Elements
const messageArea = document.getElementById("message-area");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Send message to the server
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("chat message", message);
    messageInput.value = "";
  }
});

// Listen for incoming messages
socket.on("chat message", (msg) => {
  const newMessage = document.createElement("div");
  newMessage.textContent = msg;
  messageArea.appendChild(newMessage);
  messageArea.scrollTop = messageArea.scrollHeight; // Auto-scroll
});
