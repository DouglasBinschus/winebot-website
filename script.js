const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const FUNCTION_URL =
  "https://fawinebot-aqf5gfebg5b6asa9.eastus2-01.azurewebsites.net/api/winebot_chat";

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
// Press Enter to send
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
sendBtn.onclick = async () => {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage("You: " + userText, "user");
  input.value = "";

  try {
    const response = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();
    addMessage("Bot: " + data.answer, "bot");
  } catch (err) {
    addMessage("Bot: Error contacting service.", "bot");
  }
};
