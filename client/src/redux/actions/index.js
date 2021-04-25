export const inputChange = (e) => {
  const { label } = e.target.dataset
  return {
    type: 'INPUT_CHANGE',
    payload: {
      label
    }
  }
} 

export const promiseSuccess = (property, arr) => {
  return {
    type: 'PROMISE_SUCCESS',
    payload: {
      property,
      arr
    }
  }
} 