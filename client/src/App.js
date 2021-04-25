import './App.css';
import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import { promiseSuccess } from './redux/actions'
import { CircularProgress } from '@material-ui/core';
import axios from 'axios'
import Screen from './components/screen/Screen'
import Keypad from './components/keypad/Keypad'
import StatusBar from './components/status-bar/StatusBar'

function App() {

  const dispatch = useDispatch()
  const number = useSelector(state => state.number)
  const onScreenText = useSelector(state => state.onScreenText)
  const [responseIsLoading, setResponseIsLoading] = useState(false)
  const lastNum = number[number.length - 1]

  
  const handleRequest = (endpoint, body) => {
    setResponseIsLoading(true)

    return axios.post(endpoint, body)
      .then(res => {
        const { data } = res
        const remainingTextElements = onScreenText.slice(0, onScreenText.length - 1)

        if (endpoint === '/suggestions') {
          const lastWord = data[0].slice(0, lastNum.length) // first suggested word sliced at the input length

          dispatch(promiseSuccess('onScreenText', [...remainingTextElements, lastWord]))
          dispatch(promiseSuccess('suggestedText', data))
        } else {
          const remainingNumElements = number.slice(0, number.length - 1)

          dispatch(promiseSuccess('suggestedText', []))
          dispatch(promiseSuccess('onScreenText', [...remainingTextElements, body.word, '']))
          dispatch(promiseSuccess('number', [...remainingNumElements, data.toString(), '']))
        }

        setResponseIsLoading(false)
      })
      .catch(err => {
        setResponseIsLoading(false)
        return err.response
      })
  }

  useEffect(() => {
    // no API call on initial render, no digits or if last element is ''
    if (!number || number.length === 0 || !lastNum) return

    handleRequest('/suggestions', { input: lastNum })

  }, [number])


  return (
    <div className='container__outer-screen'>
      <StatusBar />
      <Screen />
      <Keypad
        responseIsLoading={responseIsLoading}
        handleRequest={handleRequest} />

      {responseIsLoading && <CircularProgress className='progress' color='primary' />}
    </div>
  )
}

export default App;
