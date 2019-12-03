import React, { useState, useCallback } from 'react';
import './App.css';
import { recordAudio, recognition } from './utils'

function App() {
  const [transcript, setTranscript] = useState('')
  const [r, setR] = useState()
  const [recogn, setRecogn] = useState(recognition())



  const handlerStart = useCallback(async () => {
    recordAudio().then(i => {
      setR(i)
      i.start()
      recogn.start()
    })
  }, [recogn])

  const handlerStop = useCallback(() => {
    if (recogn && r) {
      recogn.stop()
      r.stop()
    }
  }, [r, recogn])

  const onRecognUpdate = useCallback(async (final = '', interm = '') => {
    let audio
    setTranscript(final)
    console.log(final)
    if (final.includes('да')) {
      console.log('match!!!')
      recogn.stop()
      audio = await r.stop()
      audio.audio.onended = (event) => {
        handlerStart()
      };
      audio.play()
    }
  }, [handlerStart, r, recogn])

  recogn.setCallback(onRecognUpdate)

  return (
    <div className="App">
      <button onClick={handlerStart}>Start</button>
      <button onClick={handlerStop}>Stop</button>
      <hr />
      <div>{transcript}</div>
    </div>
  );
}

export default App;
