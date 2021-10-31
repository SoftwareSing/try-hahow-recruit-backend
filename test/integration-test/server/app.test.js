const { expect } = require('chai')

const { appRequest } = require('./appRequest')

describe('base response', function () {
  describe('path: /', function () {
    it('should return "Hello API"', async function () {
      const res = await appRequest.get('/')
      expect(res).to.have.status(200)
      expect(res.body).to.equal('Hello API')
    })
  })
})
