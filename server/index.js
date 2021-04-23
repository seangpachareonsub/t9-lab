const express = require('express')
const words = require('./words')
const keys = require('./utils/keys')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())

app.post('/api/suggestions', (req, res) => {

  const { input } = req.body

  const result = input.split('').map(num => {
    const item = keys.find(item => item.label === num)
    if (item) {
      return item.action.split('')
    }
  })

  function findMatchingWords(arr) {

    if (arr.length < 5) { // base case for only 1 number button being pressed
      return [arr[0]]
    }

    const result = []

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < words.length; j++) {
        if (words[j].slice(0, arr[i].length).match(arr[i])) {
          result.push(words[j])
        }
      }
    }

    const suggestions = result.sort((a, b) => a.length - b.length).slice(0, 4) // word length sort to return suggestions according to input length

    return suggestions
  }

  function generateRecursion(arr) {
    if (arr.length === 1) { // base case
      return arr[0]
    } else {
      const result = []
      const allCasesOfRest = generateRecursion(arr.slice(1)) // recur with the rest of array

      for (let i = 0; i < allCasesOfRest.length; i++) {
        for (let j = 0; j < arr[0].length; j++) { // arr[0] acts as root node
          result.push(arr[0][j] + allCasesOfRest[i])
        }
      }
      return result
    }

  }

  const allPossibleCombinations = generateRecursion(result)

  const suggestions = findMatchingWords(allPossibleCombinations)

  res.status(200).json({ suggestions })
})





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})