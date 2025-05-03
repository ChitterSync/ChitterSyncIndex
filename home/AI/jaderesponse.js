// script.js
const axios = axios; // Remove the require statement, as we're in a browser environment
const form = document.getElementById('myForm');
const contentInput = document.getElementById('content');
const sendMessageButton = document.getElementById('send-button');
const checkBox = document.getElementById('groq-checkbox');
const messageHistory = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

sendMessageButton.addEventListener('click', () => {
  const content = contentInput.value;
  const data = {
    "messages": [
      {
        "role": "user",
        "content": content
      }
    ]
  };

  if (checkBox.checked) {
    axios.post("https://api.groq.co/v1/complete", data)
      .then(response => {
        const aiResponse = response.data.messages[0].content;
        logMessageToHistory(`You: ${content}`);
        logMessageToHistory(`AI: ${aiResponse}`);
        contentInput.value = '';
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    logMessageToHistory(`You: ${content}`);
    contentInput.value = '';
  }
});

function logMessageToHistory(message) {
  messageHistory.push(message);
  const csvContent = messageHistory.join('\n');
  localStorage.setItem('ai.csv', csvContent);
  console.log('Chat history logged to local storage');
}

checkBox.addEventListener('change', () => {
  if (checkBox.checked) {
    console.log('Groq API enabled');
  } else {
    console.log('Groq API disabled');
  }
});