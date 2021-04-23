import './App.css';
import React, { useEffect, useState } from 'react'
import Screen from './screen/Screen'
import Keypad from './keypad/Keypad'
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


  const handleInputChange = (e) => {
    const { label } = e.target.dataset

    if (!numInput) {
      return setNumInput(label)
    }
    if (label === '<') {
      return setNumInput(numInput.slice(0, -1))
    }

    setNumInput(numInput.concat(label))
  }

  const currentOnScreenText = textSuggestion ? textSuggestion[0].slice(0, numInput.length) : ''

  return (
    <div className='container__inner-screen'>

      <Screen
        currentOnScreenText={currentOnScreenText}
      />

      <Keypad
        numInput={numInput}
        currentOnScreenText={currentOnScreenText}
        textSuggestion={textSuggestion}
        handleInputChange={handleInputChange}
      />

    </div>


  )
}

export default App;
