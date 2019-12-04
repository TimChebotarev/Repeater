/* eslint-disable no-unused-expressions */


const Recognizer = () => {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  let finalTranscript = '', isStarted = false, onUpdateCallback = () => { };
  let speechRecognition = new window.SpeechRecognition();
  speechRecognition.lang = 'ru-RU';
  speechRecognition.interimResults = false;
  speechRecognition.maxAlternatives = 1;
  speechRecognition.continuous = true;
  speechRecognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      let transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    // document.querySelector('body').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
    onUpdateCallback(finalTranscript, interimTranscript)
  }

  speechRecognition.onend = function () {
    console.log('end')
    if (isStarted) speechRecognition.start();
  }

  const start = () => {
    if (isStarted) return
    console.log('recognition started')
    finalTranscript = ''
    isStarted = true;
    speechRecognition.start();
  }

  const stop = () => {
    if (!isStarted) return
    console.log('recognition stoped')
    finalTranscript = ''
    isStarted = false;
    speechRecognition.stop();
  }

  const setCallback = (callback) => {
    onUpdateCallback = callback
  }

  return { start, stop, setCallback }
}

export default Recognizer
