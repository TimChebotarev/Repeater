const Recorder = () =>
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
          console.log({ audio })
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, audio, play });
        });

        if (mediaRecorder.state !== 'inactive')
          mediaRecorder.stop();
        audioChunks.length = 0
      });

    resolve({ start, stop });
  });

export default Recorder
