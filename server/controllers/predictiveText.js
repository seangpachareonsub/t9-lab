const words = require('../constants/words')
const keys = require('../constants/keys')
const _ = require('lodash')


exports.handleAutoComplete = (request, h) => {
  const { word } = request.payload

  const numCombination = word
    .split('')
    .map(letter => { // return each num input letter action
      const item = keys.find(key => key.action.includes(letter))

      if (item) {
        return item.label
      }
    })

  return numCombination.join('')
}


exports.handleSuggestText = (request, h) => {

  const { input } = request.payload


  const generateLetterCombination = num => {
    return num
      .split('')
      .map(digit => { // return each num input letter action
        const item = keys.find(item => item.label === digit)

        if (item) {
          return item.action.split('')
        }
      })
  }

  const generateRecursion = arr => {
    if (arr.length === 1) { // base case
      return arr[0]
    } else {
      const result = []
      const allCasesOfRest = generateRecursion(arr.slice(1)) // recur with the rest of array

      for (let i = 0; i < allCasesOfRest.length; i++) {
        arr[0].forEach(root => {
          result.push(root + allCasesOfRest[i])
        })
      }

      return result
    }
  }

  const findMatchingWords = arr => {

    if (arr.length < 5) { // base case for only 1 number button being pressed
      return [arr[0]]
    }

    const result = []

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < words.length; j++) {

        const wordMatch = words[j] // boolean checking if letter combo matches beginning of word
          .slice(0, arr[i].length)
          .match(arr[i])

        if (wordMatch) {
          result.push(words[j])
        }
      }
    }

    const suggestions = result
      .sort((a, b) => a.length - b.length)
      .slice(0, 10) // word length sort to return top 10 suggestions according to input length

    return suggestions
  }

  const transform = _.flow([generateLetterCombination, generateRecursion, findMatchingWords])

  const suggestions = transform(input)

  return suggestions.length !== 0 ? suggestions : [input]
}