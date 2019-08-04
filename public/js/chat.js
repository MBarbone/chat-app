const socket = io();

// socket.on("countUpdated", count => {
//   console.log("The count has been updated.");
//   console.log(count);
// });

// document.getElementById("increment").addEventListener("click", () => {
//   console.log("CLICKED");
//   socket.emit("increment");
// });

socket.on("message", message => {
  console.log(message);
});

document.getElementById("messageForm").addEventListener("submit", e => {
  e.preventDefault();

  const message = e.target.elements.messageText.value;

  socket.emit("sendMessage", message);
});
