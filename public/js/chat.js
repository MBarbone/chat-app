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

document.getElementById("sendLocation").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
});
