const Hapi = require('@hapi/hapi')
const {
  handleSuggestText,
  handleAutoComplete
} = require('./controllers/textController')

const init = async () => {

  const server = Hapi.server({
    port: 3001,
    host: 'localhost'
  })

  server.route({
    method: 'POST',
    path: '/suggestions',
    handler: handleSuggestText
  })

  server.route({
    method: 'POST',
    path: '/auto-complete',
    handler: handleAutoComplete
  })


  await server.start()
  console.log(`Server listening on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {

  console.log(err)
  process.exit(1)
})

init()