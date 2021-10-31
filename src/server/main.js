const http = require('http')

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
  const port = process.env.PORT || 3000

  SERVER.listen(port, () => {
    console.log('server running')
    console.log(`port: ${port}`)
    console.log(`environment: ${process.env.NODE_ENV}`)
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