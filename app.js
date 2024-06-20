const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("bom dia chefe...");
  } else if (hour >= 12 && hour < 17) {
    speak("Boa tarde Master...");
  } else {
    speak("Boa noite Senhor THALES...");
  }
}

window.addEventListener("load", () => {
  speak("Iniciando assistente...");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "OUVINDO...";
  recognition.start();
});

function takeCommand(message) {
  if (message.includes("hey") || message.includes("hello")) {
    speak("Ola Senhor, como posso ajudar?");
  } else if (message.includes("abrir google")) {
    window.open("https://google.com", "_blank");
    speak("abrindo Google...");
  } else if (message.includes("abrir youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("abrindo Youtube...");
  } else if (message.includes("abrir facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("abrindo Facebook...");
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "Isto é o que encontrei na internet sobre " + message;
    speak(finalText);
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://en.wikipedia.org/wiki/${message
        .replace("wikipedia", "")
        .trim()}`,
      "_blank"
    );
    const finalText = "Isto é o que eu encontrei na Wikipédia sobre" + message;
    speak(finalText);
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = "A hora certa e " + time;
    speak(finalText);
  } else if (message.includes("data")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = "hoje e dia  " + date;
    speak(finalText);
  } else if (message.includes("calculadora")) {
    window.open("Calculator:///");
    const finalText = "abrindo calculadora";
    speak(finalText);
  } else {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText =
      "Encontrei algumas informações para " + message + " on Google";
    speak(finalText);
  }
}
