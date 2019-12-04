import { useState, useCallback } from 'react';
import Recorder from './recorder'
import Recognizer from './recognizer'

const useRepeater = () => {
  const [transcript, setTranscript] = useState('')
  const [recorder, setRecorder] = useState()
  const [audio, setAudio] = useState()
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
    console.log({ audio })
    if (audio) audio.pause()
  }, [recognizer, recorder, audio])

  const onRecognUpdate = useCallback(async (final = '', interm = '') => {
    setTranscript(final)
    console.log(final)
    if (final.includes('очень хорошо')) {
      console.log('match!!!')
      recognizer.stop()
      const a = await recorder.stop()
      a.audio.onended = (event) => {
        start()
      };
      setAudio(a.audio)
      a.play()
    }
  }, [recognizer, recorder, start])


  recognizer.setCallback(onRecognUpdate)

  return { start, stop, transcript }
}

export default useRepeater
