import './App.css';
import React, { useEffect, useState, useRef } from 'react'
import Screen from './screen/Screen'
import Keypad from './keypad/Keypad'
import StatusBar from './status-bar/StatusBar'
import axios from 'axios'


function App() {

  const [numInput, setNumInput] = useState()
  const [predictiveText, setPredictiveText] = useState()
  const [onScreenText, setOnScreenText] = useState()
  const onScreenTextRef = useRef()

  onScreenTextRef.current = onScreenText

  useEffect(() => {

    if (!numInput || numInput.length === 0) { // base case for initial render of component or if all digits are deleted
      setOnScreenText([])
      setPredictiveText([])
      return
    }

    const lastNum = numInput[numInput.length - 1]

    if (numInput.includes('')) return // do not make API call if there is an empty element

    axios.post('/', { input: lastNum }) // only POST last element
      .then(res => {
        const { data } = res
        const restOfElements = onScreenTextRef.current.slice(0, onScreenTextRef.current.length - 1)
        const lastWord = data[0].slice(0, lastNum.length)

        setOnScreenText([...restOfElements, lastWord]) // on screen text length matches input length
        setPredictiveText(data)

        // console.log({ numInput, tezt: onScreenTextRef.current })
      })

    

  }, [numInput])


  const handleInputChange = (e) => {

    const { label } = e.target.dataset

    if (!numInput || numInput.length === 0) { // case for the first digit input
      return setNumInput([label])
    }

    const lastNum = numInput[numInput.length - 1]
    const lastText = numInput[numInput.length - 1]
    const restOfNumElements = numInput.slice(0, numInput.length - 1)
    const restOfTextElements = onScreenText.slice(0, onScreenText.length - 1)

    if (label === '←') { // deleting digit

      if (!lastNum) return // prevents delete click when already empty

      function removeDigits(arr, element) {
        return [...arr
          .concat(element.slice(0, -1))
          .filter(el => el)]
      }

      setNumInput(removeDigits(restOfNumElements, lastNum))
      setOnScreenText(removeDigits(restOfTextElements, lastText))
      return
    }

    if (label === '0') {
      if (!lastNum || !numInput) return // adding space only if there isn't already
      setNumInput([...numInput, ''])
      setOnScreenText([...onScreenText, ''])
      return
    }

    setNumInput([...restOfNumElements.concat(lastNum + label)]) // default case
  }





  return (
    <div className='container__outer-screen'>

      <StatusBar />

      <Screen
        onScreenText={onScreenText} />

      <Keypad
        numInput={numInput}
        predictiveText={predictiveText}
        handleInputChange={handleInputChange}
        onScreenText={onScreenText} />

    </div>


  )
}

export default App;
