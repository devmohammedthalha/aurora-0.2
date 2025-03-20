responsiveVoice.setDefaultVoice("US English Female");

var bertModel;

responsiveVoice.speak("BERT Model is Loading")
// Load the model.
qna.load().then((model) => {
    console.log(model);
    bertModel = model;
});
responsiveVoice.speak("BERT Model is Loaded")

const passage = `
Aurora is transforming customer support with AI-driven assistants. Launched in 2022, it leverages NLP, voice recognition, and automation to provide instant, human-like responses without human intervention.
Three AI Models for Business Needs
JSON Model – Fast, predefined responses for FAQs.
BERT Model – Extracts precise answers from documents.
GENA Model – Conversational AI for dynamic interactions.
Key Features
Voice AI Integration – Hands-free interactions with speech recognition and synthesis.
Cost-Effective & Scalable – Reduces support costs by up to 80 percent.
Enhances Engagement & Conversions – AI-driven conversations for better customer experience.
Future Enhancements
Emotional AI and sentiment analysis
Multilingual support
AI memory for context-aware interactions
AI-powered sales assistance
Aurora is the future of AI-driven business communication, making customer interactions smarter, faster, and more efficient.`;

// SpeechRecognition

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();


recognition.onstart = function () {
    console.log("Started...");
    document.getElementById("mic").classList.add("active");
};

recognition.onend = () => {
    console.log("Ended...");
    document.getElementById("mic").classList.remove("active");
};

recognition.onresult = function (e) {
    const resultIndex = e.resultIndex;
    const { transcript } = e.results[resultIndex][0];
    console.log(transcript);
    //chat add
    let temp = `<div class="out-msg">
        <span class="my-msg">By Voice: ${transcript}</span>
        <i class="bi bi-person-fill" style="color: darkblue;font-size: 32px;"></i>
        </div>`;
    chatArea.insertAdjacentHTML("beforeend", temp);

    // Find the answers
    bertModel.findAnswers(transcript, passage).then((answers) => {
        responsiveVoice.speak(answers[0].text)
        //chat add
        let temporary = `<div class="income-msg">
            <i class="bi bi-headset" style="color: blue; font-size: 32px"></i>
            <span class="msg">${answers[0].text}</span>
            </div>`;
        chatArea.insertAdjacentHTML("beforeend", temporary);
        chatArea.scrollTop = chatArea.scrollHeight;
    });
    // responsiveVoice.speak("what are you doing!")
};

function speakNow() {
    recognition.start();
}

// chat

const popup = document.querySelector(".chat-popup");
const chatBtn = document.querySelector(".chat-btn");
const submitBtn = document.getElementById("sendBtn");
const chatArea = document.querySelector(".chat-area");
const inputElm = document.getElementById("chatinput");

//   chat button toggler

chatBtn.addEventListener("click", () => {
    popup.classList.toggle("show");
});

// send msg
inputElm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let userInput = inputElm.value.toLowerCase().trim();

        let temp = `<div class="out-msg">
  <span class="my-msg">${inputElm.value}</span>
  <i class="bi bi-person-fill" style="color: darkblue;font-size: 32px;"></i>
  </div>`;

        chatArea.insertAdjacentHTML("beforeend", temp);

        let chatBotResponse = "";

        bertModel.findAnswers(userInput, passage).then((answers) => {
            // responsiveVoice.speak(answers[0].text)
            chatBotResponse = answers[0].text;
            let temporary = `<div class="income-msg">
      <i class="bi bi-headset" style="color: blue; font-size: 32px"></i>
      <span class="msg">${chatBotResponse}</span>
  </div>`;
            chatArea.insertAdjacentHTML("beforeend", temporary);

            inputElm.value = "";
            chatArea.scrollTop = chatArea.scrollHeight;
        });


    }
});

submitBtn.addEventListener("click", () => {
    console.log(inputElm.value)
    let userInput = inputElm.value;

    let temp = `<div class="out-msg">
    <span class="my-msg">${userInput}</span>
    <i class="bi bi-person-fill" style="color: darkblue;font-size: 32px;"></i>
    </div>`;

    chatArea.insertAdjacentHTML("beforeend", temp);

    let chatBotResponse = "";

    bertModel.findAnswers(userInput, passage).then((answers) => {
        // responsiveVoice.speak(answers[0].text)
        chatBotResponse = answers[0].text;



        let temporary = `<div class="income-msg">
    <i class="bi bi-headset" style="color: blue; font-size: 32px"></i>
    <span class="msg">${chatBotResponse}</span>
</div>`;
        chatArea.insertAdjacentHTML("beforeend", temporary);

        inputElm.value = "";
        chatArea.scrollTop = chatArea.scrollHeight;
    });


});

