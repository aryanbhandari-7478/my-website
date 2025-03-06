document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    let chatBox = document.getElementById("chat-box");

    if (userInput === "") return;

    // Append user message (right side)
    let userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.innerHTML = `<div class="text">${userInput}</div><div class="avatar">🧑</div>`;
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send request to Flask backend
    fetch("/chat", {
        method: "POST",
        body: JSON.stringify({ message: userInput }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = document.createElement("div");
        botMessage.className = "message bot";
        botMessage.innerHTML = `<div class="avatar"><img src="/static/lion.jpg" alt="Bot Avatar"></div><div class="text">${data.response}</div>`;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    document.getElementById("user-input").value = "";
}
