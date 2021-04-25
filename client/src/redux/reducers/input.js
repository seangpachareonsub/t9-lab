import * as actions from '../actions/actionTypes'

const initialState = {
  number: [],
  suggestedText: [],
  onScreenText: []
}

const inputReducer = (
  state = initialState,
  action) => {

  const { number, onScreenText } = state

  // last element of num arr and text arr
  // remaining arr excluding last element of both arr
  const lastNum = number[number.length - 1]
  const lastText = onScreenText[onScreenText.length - 1]
  const remainingNum = number.slice(0, number.length - 1)
  const remainingText = onScreenText.slice(0, onScreenText.length - 1)


  switch (action.type) {

    case actions.INPUT_CHANGE:
      const { label } = action.payload

      // return state since 1 does nothing
      if (label === '1') return state

      // prevents 0 and delete as first input
      if (/[0←]/.test(label) &&
        (!number || number.length === 0)) return initialState

      // first valid input 
      if (!number || number.length === 0) {
        return {
          ...state,
          number: [label]
        }
      }

      // deleting characters in input
      if (label === '←') {

        // return arr after deletion and filters out empty elements
        function removeCharacter(arr, element) {
          return [...arr
            .concat(element.slice(0, -1))
            .filter(el => el)]
        }

        return {
          ...state,
          number: removeCharacter(remainingNum, lastNum),
          onScreenText: removeCharacter(remainingText, lastText),
          suggestedText: []
        }
      }

      if (label === '0') {
        // prevents additional space when already there
        if (!lastNum) return state

        return {
          ...state,
          number: [...number, ''],
          // remove suggested texts on start of new word
          suggestedText: [],
          onScreenText: [...onScreenText, '']
        }
      }

      // default input change
      // concat digit to last element of arr
      return {
        ...state,
        number: [...remainingNum.concat(lastNum + label)],
      }


    case actions.PROMISE_SUCCESS:
      // return new state passed as function argument
      return action.payload.obj

    default:
      return state

  }
}

export default inputReducer