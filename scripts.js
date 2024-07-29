var aktuellesBildIndex = 0;
var bilder = [
  "https://i.ibb.co/Ct94LFD/Bild-2023-12-24-212159813.png",
  "https://i.ibb.co/CHDQH0S/Bild-2023-12-24-212441789.png",
  "https://i.ibb.co/NFq6Tzs/Bild-2023-12-24-213213718.png",
  "https://i.ibb.co/FXSPrT4/Bild-2023-12-24-213647054.png",
  "https://i.ibb.co/ZB3t7TQ/Whats-App-Image-2023-12-25-at-10-04-30.jpg",
  "https://i.ibb.co/jJb84bD/Whats-App-Image-2023-12-27-at-22-34-46.jpg",
];

function vorherigesBild() {
  if (aktuellesBildIndex > 0) {
    aktuellesBildIndex--;
  } else {
    aktuellesBildIndex = bilder.length - 1;
  }
  zeigeAktuellesBild();
}

function naechstesBild() {
  if (aktuellesBildIndex < bilder.length - 1) {
    aktuellesBildIndex++;
  } else {
    aktuellesBildIndex = 0;
  }
  zeigeAktuellesBild();
}

function zeigeAktuellesBild() {
  var bildAnzeige = document.getElementById("bildAnzeige");
  bildAnzeige.src = bilder[aktuellesBildIndex];
  bildAnzeige.alt = "Bild " + (aktuellesBildIndex + 1);
}

document.addEventListener("DOMContentLoaded", function () {
  var footer = document.getElementById("footer");
  var collapseButton = document.getElementById("collapseButton");

  collapseButton.addEventListener("click", function () {
    footer.classList.toggle("collapsed");
  });
});

const intents = {
  intents: [
    {
      tag: "begrüßen",
      patterns: ["hallo", "hey", "hi", "guten tag", "grüß dich", "was geht"],
      responses: ["Hallo!", "Hey!", "Was kann ich für dich machen?"],
    },
    {
      tag: "name",
      patterns: [
        "Wie heißt du?",
        "wie soll ich dich nennen?",
        "hast du einen namen?",
        "Wer bist du?",
        "Kannst du mir deinen Namen verraten?",
      ],
      responses: [
        "Ich heiße Ata.",
        "Mein Name ist Ata.",
        "Du kannst mich gerne Ata nennen.",
      ],
    },
    {
      tag: "age",
      patterns: [
        "Wie alt bist du?",
        "Was ist dein alter",
        "Wann bist du geboren",
        "Wann hast du Geburtstag",
      ],
      responses: ["Ich bin 18 Jahre alt und bin am 10.11.2005 geboren."],
    },
    {
      tag: "Ort",
      patterns: [
        "Woher kommst du",
        "wo wohnst du",
        "wo bist du aufgewachsen",
        "wo lebst du",
        "wo lebst du zur zeit",
      ],
      responses: ["Ich lebe in Hamburg."],
    },
    {
      tag: "Erreichbar",
      patterns: [
        "Wann bist du erreichbar",
        "wann kann man dir schreiben",
        "wie kann man dir schreiben",
        "wo kann man dir schreiben",
        "Wie kann man dich erreichen",
      ],
      responses: [
        "Du kannst mich jederzeit unter ata2005hh@gmail.com erreichen.",
      ],
    },
    {
      tag: "Skills",
      patterns: [
        "Was kannst du?",
        "Wie lange programmierst du schon?",
        "Seit wann programmierst du?",
        "Was programmierst du?",
        "Welche Sprachen beherrscht du?",
        "mit welchen sprachen programmierst du",
        "Womit hast du diese website gemacht",
      ],
      responses: [
        "Ich programmiere, seit 2023 und beherrsche HTML, CSS und JavaScript, welche ich auch benutzt habe zum Programmieren dieser Website. Außerdem kann ich Python.",
      ],
    },

    //**Englisch */

    {
      tag: "skills",
      patterns: [
        "What can you do?",
        "How long have you been programming?",
        "Since when have you been programming?",
        "What do you program?",
        "Which languages do you master?",
        "What languages do you program with?",
        "What did you use to make this website?",
      ],
      responses: [
        "I have been programming since 2023 and master HTML, CSS, and JavaScript, which I also used to program this website. Additionally, I can program in Python.",
      ],
    },

    {
      tag: "greeting",
      patterns: ["hello", "hey", "hi", "good day", "how are you", "what's up"],
      responses: ["Hello!", "Hey!", "What can I do for you?"],
    },
    {
      tag: "name",
      patterns: [
        "What's your name?",
        "how should I call you?",
        "do you have a name?",
        "Who are you?",
        "Can you tell me your name?",
      ],
      responses: ["My name is Ata.", "My name is Ata.", "You can call me Ata."],
    },
    {
      tag: "age",
      patterns: [
        "How old are you?",
        "What is your age",
        "When were you born",
        "When is your birthday",
      ],
      responses: ["I am 18 years old and was born on 10th November 2005."],
    },
    {
      tag: "location",
      patterns: [
        "Where are you from",
        "where do you live",
        "where did you grow up",
        "where do you reside",
        "where are you living now",
      ],
      responses: ["I live in Hamburg."],
    },
    {
      tag: "availability",
      patterns: [
        "When are you available",
        "when can I message you",
        "how can I message you",
        "where can I message you",
        "How can I reach you",
      ],
      responses: ["You can reach me anytime at ata2005hh@gmail.com."],
    },
  ],
};

function removePunctuation(text) {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

function levenshteinDistance(s1, s2) {
  if (s1.length < s2.length) return levenshteinDistance(s2, s1);
  if (s2.length === 0) return s1.length;
  let previousRow = Array.from(Array(s2.length + 1).keys());
  for (let i = 0; i < s1.length; i++) {
    let currentRow = [i + 1];
    for (let j = 0; j < s2.length; j++) {
      let insertions = previousRow[j + 1] + 1;
      let deletions = currentRow[j] + 1;
      let substitutions = previousRow[j] + (s1[i] !== s2[j] ? 1 : 0);
      currentRow.push(Math.min(insertions, deletions, substitutions));
    }
    previousRow = currentRow;
  }
  return previousRow[previousRow.length - 1];
}

function getResponse(userInput) {
  const userText = removePunctuation(userInput.toLowerCase());
  const distances = [];
  intents.intents.forEach((intent) => {
    intent.patterns.forEach((pattern) => {
      const patternText = removePunctuation(pattern.toLowerCase());
      const distance = levenshteinDistance(userText, patternText);
      distances.push({ distance: distance, responses: intent.responses });
    });
  });
  const minDistance = Math.min(...distances.map((obj) => obj.distance));
  const minDistanceObj = distances.find((obj) => obj.distance === minDistance);
  if (minDistance <= 5) {
    return minDistanceObj.responses[
      Math.floor(Math.random() * minDistanceObj.responses.length)
    ];
  } else {
    return "Entschuldigung, ich habe das nicht verstanden.";
  }
}

function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  appendMessage("You: " + userInput, false);
  document.getElementById("user-input").value = "";
  const response = getResponse(userInput);
  appendMessage(response, true);
}

function appendMessage(message, isBot) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.className = "message";

  if (isBot) {
    const botPic = document.createElement("img");
    botPic.src = "https://cdn-icons-png.flaticon.com/128/10479/10479785.png";
    messageElement.appendChild(botPic);
  }

  const textElement = document.createElement("span");
  textElement.textContent = message;
  messageElement.appendChild(textElement);

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("open-chat").addEventListener("click", function () {
  document.getElementById("chat-container").style.display = "flex";
});

document.getElementById("open-chat").addEventListener("click", function () {
  document.getElementById("chat-container").style.display = "flex";
  this.style.display = "none"; // Verberge den Button, wenn der Chat geöffnet ist
});

document.getElementById("close-chat").addEventListener("click", function () {
  document.getElementById("chat-container").style.display = "none";
  document.getElementById("open-chat").style.display = "block"; // Zeige den Button wieder an, wenn der Chat geschlossen wird
});
