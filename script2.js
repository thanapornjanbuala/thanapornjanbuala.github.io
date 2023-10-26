let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

document.querySelector("#rate").addEventListener("input", () => {
  const rate = document.querySelector("#rate").value;
  speech.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  speech.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
  speech.pitch = pitch;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});

document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

function speakText(text) {
  var speech = new SpeechSynthesisUtterance();
  speech.lang = 'en-US';
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

function testSpeech() {
  var testBtn = document.getElementById("start-test");
  var phrasePara = document.getElementById("phrase");
  var resultPara = document.getElementById("result");
  var diagnosticPara = document.getElementById("diagnostic");

  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phrase = document.getElementById("phraseTextArea").value.toLowerCase();
  phrasePara.textContent = phrase;
  resultPara.textContent = 'Right or wrong?';
  resultPara.style.background = 'rgba(0,0,0,0.2)';
  diagnosticPara.textContent = '...diagnostic messages';

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

  recognition.lang = "en-US"; // เปลี่ยนภาษาได้ ถ้าต้องการ

  recognition.onresult = function (event) {
    var speechResult = event.results[0][0].transcript.toLowerCase();
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
    speakText('Speech received: ' + speechResult);
    if (speechResult === phrase) {
      resultPara.textContent = 'I heard the correct phrase!';
      resultPara.style.background = 'lime';
      speakText('I heard the correct phrase!');
    } else {
      resultPara.textContent = 'That didn\'t sound right.';
      resultPara.style.background = 'red';
      speakText('That didn\'t sound right.');
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }

  recognition.onaudiostart = function(event) {
    console.log('SpeechRecognition.onaudiostart');
  }

  recognition.onaudioend = function(event) {
    console.log('SpeechRecognition.onaudioend');
  }

  recognition.onend = function(event) {
    console.log('SpeechRecognition.onend');
  }

  recognition.onnomatch = function(event) {
    console.log('SpeechRecognition.onnomatch');
  }

  recognition.onsoundstart = function(event) {
    console.log('SpeechRecognition.onsoundstart');
  }

  recognition.onsoundend = function(event) {
    console.log('SpeechRecognition.onsoundend');
  }

  recognition.onspeechstart = function (event) {
    console.log('SpeechRecognition.onspeechstart');
  }

  recognition.onstart = function(event) {
    console.log('SpeechRecognition.onstart');
  }

  recognition.start();
}

document.getElementById("start-test").addEventListener('click', testSpeech);
