const words = require('../constants/words')
const keys = require('../constants/keys')
require('lodash.combinations')
const _ = require('lodash')


exports.handleAutoComplete = (request, h) => {
  const { word } = request.payload

  const arr = word
    // split word by letters
    .split('')
    // map through and return corresponding number
    .map(letter => keys
      .find(key => key.action
        .includes(letter)).label)

  // return merged number arr
  return arr.join('')
}


exports.handleSuggestText = (request, h) => {

  const { input } = request.payload

  const generateLetterCombination = num => {
    const number = num
      // split input
      .split('')
      // map through and find corresponding keys
      .map(digit => keys
        .find(item => item.label === digit))

    return number
      // return the arr of corresponding letters
      .map(obj => obj.action.split(''))
  }

  const generateRecursion = arr => {

    // base case for length 1 input
    if (arr.length === 1) {
      return arr[0]
    }

    const result = []
    // // recur with the rest of array
    const allCasesOfRest = generateRecursion(arr.slice(1))

    for (const i in allCasesOfRest) {
      for (const j in arr[0]) {
        result.push(arr[0][j] + allCasesOfRest[i])
      }
    }

    return result
  }

  const findMatchingWords = arr => {

    const result = words
      // filter through word arr
      .filter(word => arr
        // return true if letter pattern matches beginning of word 
        .some(pattern => word
          .slice(0, input.length)
          .includes(pattern)))

    return result
      // sort by word length and return top 10 matches 
      .sort((a, b) => a.length - b.length)
      .slice(0, 10)
  }

  const transform = _.flow([generateLetterCombination, generateRecursion, findMatchingWords])
  const suggestions = transform(input)

  return suggestions.length !== 0 ? suggestions : [input]
}