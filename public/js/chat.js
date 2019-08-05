const socket = io();

// elements to call
const $messageForm = document.getElementById("messageForm");
const $messageFormInput = document.getElementById("formInput");
const $messageFormButton = document.getElementById("formButton");
const $locationButton = document.getElementById("sendLocation");
const $messages = document.getElementById("messages");

// templates
const messageTemplate = document.getElementById("message-template").innerHTML;

socket.on("message", message => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", e => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.messageText.value;

  socket.emit("sendMessage", message, error => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
    console.log("The message was delivered.");
  });
});

document.getElementById("sendLocation").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  $locationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        $locationButton.removeAttribute("disabled");
        console.log("Location shared!");
      }
    );
  });
});
