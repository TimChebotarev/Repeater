import { useState, useCallback } from 'react';
import Recorder from './recorder'
import Recognizer from './recognizer'

const useRepeater = () => {
  const [transcript, setTranscript] = useState('')
  const [recorder, setRecorder] = useState()
  const [recognizer] = useState(Recognizer())

  const start = useCallback(async () => {
    Recorder().then(i => {
      setRecorder(i)
      i.start()
      recognizer.start()
    })
  }, [recognizer])

  const stop = useCallback(() => {
    recognizer.stop()
    recorder.stop()
  }, [recorder, recognizer])

  const onRecognUpdate = useCallback(async (final = '', interm = '') => {
    let audio
    setTranscript(final)
    console.log(final)
    if (final.includes('очень хорошо')) {
      console.log('match!!!')
      recognizer.stop()
      audio = await recorder.stop()
      audio.audio.onended = (event) => {
        start()
      };
      audio.play()
    }
  }, [recognizer, recorder, start])


  recognizer.setCallback(onRecognUpdate)

  return { start, stop, transcript }
}

export default useRepeater
