import React, { useState, useCallback } from 'react';
import { recordAudio, recognition } from './utils'

function Repeater(props) {
  const classes = ['Repeater']
  if (props.className) classes.push(props.className)

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
    recogn.stop()
    r.stop()
  }, [r, recogn])

  const onRecognUpdate = useCallback(async (final = '', interm = '') => {
    let audio
    setTranscript(interm)
    console.log(final)
    if (final.includes('очень хорошо')) {
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
    <div className={classes.join(' ')}>
      <button className="button" onClick={handlerStart}>Start</button>
      <button className="button" onClick={handlerStop}>Stop</button>
      <button className="button" onClick={props.onTraining}>Train</button>
      <hr />
      <textarea className="text" readOnly value={transcript}></textarea>
    </div>
  )
}

export default Repeater
