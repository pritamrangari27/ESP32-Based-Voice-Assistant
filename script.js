const startBtn = document.getElementById("start-btn");
const output = document.getElementById("output");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    output.textContent = "Listening...";
};

recognition.onspeechend = function () {
    recognition.stop();
    output.textContent = "Processing...";
};

recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = "You said: " + transcript;

    // Send the transcript to ESP32
    sendToESP32(transcript);
};

startBtn.addEventListener("click", () => {
    recognition.start();
});

// Function to send the voice input to ESP32
function sendToESP32(text) {
    const esp32Url = "Your Url"; // Replace with your ESP32's actual IP

    fetch(esp32Url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text }),
    })
    .then(response => response.text())
    .then(data => {
        console.log("Response from ESP32:", data);
    })
    .catch(error => {
        console.error("Error sending data to ESP32:", error);
    });
}

