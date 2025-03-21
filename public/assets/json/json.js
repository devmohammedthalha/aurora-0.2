
// Your web app's Firebase configuration
// const firebaseConfig = {
    
// };

// initializing firebase app
const app = firebase.initializeApp(firebaseConfig);

// database firestore
const db = firebase.firestore();


// Whole Data Set
var aiData = JSON.parse(data);  // Whole Data
var lenAiData = aiData.length; // Length of Whole Data

responsiveVoice.setDefaultVoice("US English Female");

var keys = [];


for (let i = 0; i < lenAiData; i++) {

    var nestedData = aiData[i]; // Iterated Topic (or) Data

    var nestedDataKeys = Object.keys(nestedData); // Keys of Dictionary

    var lenNestedData = Object.keys(nestedData).length; // Length of Keys in a Topic

    for (let j = 0; j < lenNestedData; j++) {
        var dataKey = nestedDataKeys[j];
        var dataValue = nestedData[nestedDataKeys[j]];
        keys.push(dataKey);
    }
}


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
    speakOutLoud(transcript.toLowerCase());
};

function speakNow() {
    recognition.start();
}

var i = 0;
if (i == 0) {
    i += 1;
    speakOutLoud("...");
}

function speakOutLoud(transcript) {

    let spoken = transcript;

    // responsiveVoice.speak(transcript)

    var send = true;

    for (key of keys) {
        if (spoken.includes(key)) {
            send = false;
            break;
        }
    }
    //console.log(send);

    // Time
    let timestamp = new Date().toISOString().replace(/[:.]/g, '-');     
    /*
    if (send === true || send===false) {
      db.collection("UsersData").doc(sysDate).update({
        [dt] : {
          "a" : !send
        }
      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
    */


    if (send === true) {
        db.collection("Questions").doc("Unknown").update({
            [timestamp]: spoken
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        // utterance.text = "Sorry, I can't understand you...";
        // speechSynthesis.speak(utterance);
        responsiveVoice.speak("Sorry, I can't understand you...")

    }

    // For Loop to iterate - Topics (or) Dictionary in the Whole Data  
    for (let i = 0; i < lenAiData; i++) {
        //if (i === 0) { continue; }
        var nestedData = aiData[i]; // Iterated Topic (or) Data
        //console.log(nestedData);  // Logging Iterated Topic (or) Data

        var nestedDataKeys = Object.keys(nestedData); // Keys of Dictionary

        var lenNestedData = Object.keys(nestedData).length; // Length of Keys in a Topic
        //console.log(lenNestedData);

        for (let j = 0; j < lenNestedData; j++) {
            var dataValues = nestedData[nestedDataKeys[j]];
            //console.log(dataValues);
            if (spoken.includes(nestedDataKeys[j])) {
                responsiveVoice.speak(dataValues)
                break;
            }
        }
    }

}
