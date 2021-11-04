const http = require('http')

const { ENV } = require('~config/env')
const { port } = require('~config/serverConfig')
const { expressApp } = require('./expressApp')

function main () {
  const app = expressApp()
  const httpServer = http.createServer(app)

  startServer(httpServer)

  process.on('SIGINT', () => {
    console.info('SIGINT signal received')
    closeServer(httpServer, app)
  })
}

function startServer (SERVER) {
  SERVER.listen(port, () => {
    console.log('server running')
    console.log(`port: ${port}`)
    console.log(`environment: ${ENV}`)
  })
}

function closeServer (SERVER, app) {
  app.closeConnection()

  console.log(`${new Date().toISOString()} closing http server`)
  SERVER.close(async (err) => {
    console.log(`${new Date().toISOString()} closed http server`)
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log(`${new Date().toISOString()} all done, process.exit(0)`)
    process.exit(0)
  })
}

main()
