import React, { useState, useCallback } from 'react';
import './App.css';
import Training from './Training';
import Repeater from './Repeater';

function App() {
  const [isTraining, setIsTraining] = useState(false)

  return (
    <div className="App">
      {isTraining ?
        <Training onClose={() => setIsTraining(false)} />
        :
        <Repeater onTraining={() => setIsTraining(true)} />}
    </div>
  );
}

export default App;
