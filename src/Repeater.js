import React, { useState, useCallback } from 'react';
import useRepeater from './utils/useRepeater';


function Repeater(props) {
  const classes = ['Repeater']
  if (props.className) classes.push(props.className)
  const { start, stop, transcript } = useRepeater()

  return (
    <div className={classes.join(' ')}>
      <button className="button" onClick={start}>Start</button>
      <button className="button" onClick={stop}>Stop</button>
      <button className="button" onClick={props.onTraining}>Train</button>
      <hr />
      <textarea className="text" readOnly value={transcript}></textarea>
    </div>
  )
}

export default Repeater
