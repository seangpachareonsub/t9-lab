const Hapi = require('@hapi/hapi')
const words = require('./words')
const keys = require('./utils/keys')

const init = async () => {

  const server = Hapi.server({
    port: 3001,
    host: 'localhost'
  })

  server.route({
    method: 'POST',
    path: '/',
    handler: (request, h) => {

      const { input } = request.payload

      const letterCombinationArr = input
        .split('')
        .map(num => { // return each num input letter action
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
          .slice(0, 4) // word length sort to return suggestions according to input length

        return suggestions
      }

      function generateRecursion(arr) {
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

      const allPossibleCombinations = generateRecursion(letterCombinationArr)

      const suggestions = findMatchingWords(allPossibleCombinations)

      return suggestions.length !== 0 ? suggestions : [input]
    }
  })


  await server.start()
  console.log(`Server listening on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {

  console.log(err)
  process.exit(1)
})

init()