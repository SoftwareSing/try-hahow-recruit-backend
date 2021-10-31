const appRequest = require('./appRequest')

before(async function () {
  this.timeout(10000)

  console.log('start integration test for server')
  console.log('')
})

after(async function () {
  this.timeout(10000)

  await closeAppRequest()
})

function closeAppRequest () {
  return new Promise((resolve, reject) => {
    appRequest.close((err) => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}
