import './App.css';
import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { promiseSuccess } from './redux/actions'
import { CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'
import Screen from './components/screen/Screen'
import Keypad from './components/keypad/Keypad'
import StatusBar from './components/status-bar/StatusBar'

function App() {

  const dispatch = useDispatch()

  // states
  const state = useSelector(state => state)
  const { number, onScreenText } = state

  const [responseIsLoading, setResponseIsLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(true)
  const lastNum = number[number.length - 1]


  useEffect(() => {
    // no API call on initial render, if no digits or if last element is ''
    if (!number || number.length === 0 || !lastNum) return

    handleRequest('/suggestions', { input: lastNum })

  }, [number])


  // function for api calls
  const handleRequest = (endpoint, body) => {

    // renders visual aid for api call
    setResponseIsLoading(true)

    return axios
      .post(endpoint, body)
      .then(res => {

        const { data } = res
        const remainingTextElements = onScreenText.slice(0, onScreenText.length - 1)

        if (endpoint === '/suggestions') {
          const lastWord = data[0].slice(0, lastNum.length)

          dispatch(promiseSuccess({
            ...state,
            onScreenText: [...remainingTextElements, lastWord],
            suggestedText: data
          }))
        }

        if (endpoint === '/auto-complete') {
          const remainingNumElements = number.slice(0, number.length - 1)

          dispatch(promiseSuccess({
            onScreenText: [...remainingTextElements, body.word, ''],
            suggestedText: [],
            number: [...remainingNumElements, data.toString(), '']
          }))
        }

        setResponseIsLoading(false)
      })
      .catch(err => {
        setResponseIsLoading(false)
        return err.response
      })
  }

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSnackBarClose = () => {
    setSnackbarOpen(false)
  }



  return (
    <div className='container__outer-screen'>
      <StatusBar />
      <Screen />
      <Keypad
        responseIsLoading={responseIsLoading}
        handleRequest={handleRequest}
      />

      {responseIsLoading && (
        <CircularProgress
          className='progress'
          color='primary'
        />
      )}

      {snackbarOpen && (
        <Snackbar open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackBarClose}>
          <Alert severity="info">
            Click on the suggestions to auto-complete the word
        </Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default App;

