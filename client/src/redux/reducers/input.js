import * as actions from '../actions/actionTypes'

const initialState = {
  number: [],
  suggestedText: [],
  onScreenText: []
}

const inputReducer = (state = initialState, action) => { // pure function, keep API calls in app.js

  switch (action.type) {

    case actions.INPUT_CHANGE:
      const { label } = action.payload
      const { number, onScreenText } = state

      if (/[0←]/.test(label) && (!number || number.length === 0)) { // prevents space and delete as first input
        return initialState
      } 

      if (!number || number.length === 0) { // case for the first valid input 
        return {
          ...state,
          number: [label]
        }
      }

      const lastNum = number[number.length - 1]
      const lastText = onScreenText[onScreenText.length - 1]
      const remainingNum = number.slice(0, number.length - 1)
      const remainingText = onScreenText.slice(0, onScreenText.length - 1)

      if (label === '←') { // deleting characters

        function removeCharacter(arr, element) {
          return [...arr
            .concat(element.slice(0, -1))
            .filter(el => el)] // filters out any empty strings after deletion
        }

        return {
          ...state,
          number: removeCharacter(remainingNum, lastNum),
          onScreenText: removeCharacter(remainingText, lastText),
          suggestedText: []
        }
      }

      if (label === '0') {
        if (!lastNum) return state // prevents additional space when already there
        return {
          ...state,
          number: [...number, ''],
          suggestedText: [], // remove suggested texts on start of new word
          onScreenText: [...onScreenText, '']
        }
      }

      return {
        ...state,
        number: [...remainingNum.concat(lastNum + label)],
      }  // default


    case actions.PROMISE_SUCCESS:
      const { property, arr } = action.payload

      return {
        ...state,
        [property]: arr
      }

    default:
      return state

  }
}

export default inputReducer