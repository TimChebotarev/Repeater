/* eslint-disable no-unused-expressions */
const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => {
      console.log('record started')
      mediaRecorder.start();
    }

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          console.log('record stoped')
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, audio, play });
        });

        if (mediaRecorder.state !== 'inactive')
          mediaRecorder.stop();
        audioChunks.length = 0
      });

    resolve({ start, stop });
  });

// const sleep = time => new Promise(resolve => setTimeout(resolve, time));
// (async () => {
//   const recorder = await recordAudio();
//   recorder.start();
//   await sleep(3000);
//   const audio = await recorder.stop();
//   audio.play();
// })();

const recognition = () => {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  let finalTranscript = '', isStarted = false, onUpdateCallback = () => { };
  let speechRecognition = new window.SpeechRecognition();
  speechRecognition.lang = 'ru-RU';
  speechRecognition.interimResults = true;
  speechRecognition.maxAlternatives = 10;
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

export { recordAudio, recognition }
