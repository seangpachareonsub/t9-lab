import './App.css';
import React, { useEffect, useState } from 'react'
import Screen from './screen/Screen'
import Keyboard from './keyboard/Keyboard'
import axios from 'axios'

function App() {

  const [numInput, setNumInput] = useState()
  const [textSuggestion, setTextSuggestion] = useState()

  useEffect(() => {

    if (!numInput) return

    axios.post('/api/suggestions', { input: numInput })
    .then(res => {
      console.log(res.data.suggestions)
      setTextSuggestion(res.data.suggestions)
    })

  }, [numInput])
  
  return (
    <div style={{ display: 'grid', height: '100vh', placeContent: 'center' }}>

      <h1> T9 Predictive Text Lab </h1>

      <Screen textSuggestion={textSuggestion && textSuggestion[0].slice(0, numInput.length)} />

      <div style={{ border: '1px solid black', height: '30px', width: '100%', margin: '1rem 0'}}>
        {textSuggestion?.slice(0, 4).map((word, i) => {
          return <span key={i}> { word } </span>
        })}
      </div>

      <Keyboard numInput={numInput} setNumInput={setNumInput} />
    </div>
  );
}

export default App;
