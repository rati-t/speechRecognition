var badWords = [];

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


// Event listeners

window.onload = () => {
    for(var i = 0; i < Langs.length; i++) {
        var option = document.createElement("option");
        option.value = Langs[i];
        option.innerText = Langs[i];
        document.getElementById("langs").append(option);
    }
};

document.getElementById("startSpeech").onclick = function() {
    if(recognition.State = "finished") {
        recognition.lang =  document.getElementById("langs").value;
        recognition.start();
        console.log('Ready to receive a color command.');
    }
}

recognition.addEventListener('start', function() {
    recognition.State = "listening";
});

recognition.addEventListener('end', function() {
    recognition.State = "finished";
});

recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    for(var i = 0; i < badWords.length; i++) {
        if(event.results[0][0].transcript.includes(badWords[i])) {
            text = text.replace(badWords[i], "####");
            console.log(text);
        }
    }
  document.getElementById("output").innerText = text;
  console.log(text);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}



// fuction

function AddBadWord() {
    let badWord = document.getElementById("badWordInput").value;
    if(badWord == "####") 
    {
        return 0;
    }
    badWords.push(badWord);
    var listElement = document.createElement("li");
    listElement.innerText = badWord;
    document.getElementById("badWordList").append(listElement);
}

function clearBadWords() {
    badWords = [];
    document.getElementById("badWordList").innerHTML = "<th>Bet Words List</th>"
}