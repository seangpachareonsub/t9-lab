import * as actions from './actionTypes'

// action creators

export const inputChange = e => ({ 
  type: actions.INPUT_CHANGE,
  payload: {
    label: e.target.dataset.label
  }
})



export const promiseSuccess = (property, arr) => ({
  type: actions.PROMISE_SUCCESS,
  payload: {
    property,
    arr
  }
})
