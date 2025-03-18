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
Aurora – The AI Revolution in Customer Support & Voice Assistance
In a world where businesses are constantly seeking efficiency, automation, and better customer experiences, Aurora emerges as a game-changer, transforming how brands interact with customers, automate support, and enhance user engagement. Launched in 2022, Aurora was designed with a singular vision – to completely replace traditional customer support with AI-driven assistants. By leveraging cutting-edge natural language processing (NLP), voice recognition, and AI-powered automation, Aurora empowers businesses to provide instant, accurate, and human-like responses to their customers, all without requiring human intervention.

Unlike traditional chatbots that rely on scripted responses, Aurora understands, processes, and responds intelligently, making it a powerful, scalable, and cost-effective solution for businesses of all sizes. Whether it’s answering customer queries, guiding users through processes, providing voice-enabled interactions, or delivering personalized support, Aurora ensures that businesses stay ahead of the curve by automating conversations while keeping them engaging and meaningful.

How Aurora Works – Three AI Models for Every Business Need
Aurora is built for flexibility with three AI models, each tailored to different business requirements:

1. JSON Model – The Fastest AI Assistant for Instant Q&A
The JSON Model is a lightweight, rule-based system that delivers predefined answers based on a structured JSON dataset. This model is ideal for businesses that need quick, predefined responses for FAQs, customer inquiries, and common support questions.

🔹 Key Features:
✅ Instant Responses – No AI processing delay, making it the fastest AI model.
✅ Predefined Answers – Ensures accurate and consistent responses every time.
✅ Simple & Efficient – Works without heavy computing power, making it perfect for small businesses and e-commerce stores.
✅ Voice-Enabled – Can function as a voice assistant for hands-free interactions.

💡 Example:
If a customer asks, “What are your working hours?”, the JSON model instantly fetches the stored response “Our store operates from 9 AM to 9 PM.”

2. BERT Model – Precision-Based AI for Detailed Answers
The BERT Model takes customer interaction to the next level by leveraging TensorFlow.js AI technology. Instead of predefined answers, BERT extracts precise responses from a given business document or passage, making it ideal for handling technical support, in-depth queries, and complex customer concerns.

🔹 Key Features:
✅ AI-Powered Understanding – Reads and processes entire business documents to generate accurate responses.
✅ High Precision – Perfect for businesses in finance, healthcare, tech, and legal industries where accuracy matters.
✅ Voice & Text Support – Works for both chat-based and voice-based interactions.

💡 Example:
If a user asks, "What is your refund policy?", the BERT model extracts a specific paragraph from the company’s terms and conditions, providing an accurate and relevant response.

3. GENA Model – Conversational AI for Engaging Customer Experiences
GENA is the most advanced AI chatbot in Aurora’s lineup, leveraging Transformers.js to enable context-aware, natural conversations. Unlike JSON and BERT, GENA does not rely on predefined responses—it actively understands user input and generates dynamic replies, making it perfect for interactive chatbots, customer engagement, and AI-driven sales assistance.

🔹 Key Features:
✅ Human-Like Conversations – Engages users in free-flowing, contextually aware discussions.
✅ Dynamic Response Generation – No need for predefined datasets—GENA thinks and responds like a human.
✅ Perfect for Sales & Support – Businesses can use GENA to convert leads into customers, answer complex questions, and guide users seamlessly.

💡 Example:
If a user says, "Tell me about your services", GENA responds with a structured, conversational answer rather than a simple predefined response. It may follow up with "Are you looking for website development or AI integration?", making interactions more engaging and personalized.

Aurora’s Cutting-Edge Voice AI – The Future of Business Communication
What sets Aurora apart is its seamless integration of Voice AI, allowing users to speak naturally while the assistant listens, processes, and responds. This creates a completely hands-free experience, making it faster, more convenient, and more accessible for customers.

🔹 Voice Recognition (Speech-to-Text)
Converts spoken words into text in real time using advanced speech recognition.
Helps businesses eliminate typing efforts and provide faster service.
Useful for customer support, AI receptionists, and mobile-friendly interactions.
🔹 Voice Synthesis (Text-to-Speech)
Converts AI-generated responses into natural-sounding speech.
Provides a more engaging and lifelike AI assistant experience.
Businesses can deploy voice-based assistants for customer service, sales, and navigation.
🔹 Real-World Use Cases
✅ AI-powered receptionists – Handles customer inquiries without human intervention.
✅ E-commerce support – Answers queries related to orders, refunds, and tracking.
✅ Healthcare & Banking – Provides secure, AI-driven guidance on patient and financial services.

Why Businesses Need Aurora Today
Aurora is more than just an AI assistant—it’s a business accelerator. By integrating Aurora, businesses can:

✅ Save Money – Reduce customer support costs by up to 80%.
✅ Scale Seamlessly – Handle thousands of queries simultaneously without hiring extra staff.
✅ Boost Engagement – Create interactive, human-like AI conversations that keep customers engaged.
✅ Improve Customer Satisfaction – Provide instant, accurate, and personalized responses 24/7.
✅ Increase Conversions – Turn visitors into customers with AI-driven sales assistance.

No matter the industry—retail, finance, healthcare, technology, or e-commerce—Aurora delivers the ultimate AI support solution.

The Future of Aurora – What’s Next?
Aurora is constantly evolving with upcoming AI-powered enhancements that will redefine customer interactions:

🔹 Sentiment Analysis & Emotional AI – Understands customer emotions and tailors responses accordingly.
🔹 Multilingual Support – Expanding to multiple languages for global businesses.
🔹 Advanced AI Memory – Retains past conversations for context-aware discussions.
🔹 AI-Powered Sales Conversions – Helps businesses convert visitors into paying customers automatically.
🔹 Smart Voice Commands – Enables users to navigate websites, place orders, and control AI-powered functions with voice input.

As AI continues to advance, Aurora remains at the forefront, ensuring businesses have the smartest, fastest, and most intuitive AI assistants.


`;

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

