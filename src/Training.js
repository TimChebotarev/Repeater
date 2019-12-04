import React from 'react'

function Training(props) {
  const classes = ['Training']
  if (props.className) classes.push(props.className)

  return (
    <div className={classes.join(' ')}>
      Training
      <button onClick={props.onClose}>Close</button>
    </div>
  )
}

export default Training
