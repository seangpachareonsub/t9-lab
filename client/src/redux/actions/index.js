import * as actions from './actionTypes'

export const inputChange = (e) => ({
  type: actions.INPUT_CHANGE,
  payload: {
    label: e.target.dataset.label
  }
})

export const promiseSuccess = obj => ({
  type: actions.PROMISE_SUCCESS,
  payload: {
    obj
  }
})
