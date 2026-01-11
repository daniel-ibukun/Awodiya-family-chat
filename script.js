const chatBox = document.getElementById("chat-box");
const nameInput = document.getElementById("name-input");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Load previous messages from localStorage
let messages = JSON.parse(localStorage.getItem("familyMessages") || "[]");
messages.forEach(msg => addMessageToChat(msg));

// Send message
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const name = nameInput.value.trim() || "Anonymous";
    const text = messageInput.value.trim();
    if (text === "") return;

    const message = {
        name: name,
        text: text,
        timestamp: Date.now()
    };

    // Add to chat and local storage
    messages.push(message);
    localStorage.setItem("familyMessages", JSON.stringify(messages));

    addMessageToChat(message);
    messageInput.value = "";
}

function addMessageToChat(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${message.name}:</strong> ${message.text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
