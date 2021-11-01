const { expect } = require('chai')

const { httpSend } = require('~common/utils/httpSend')
const { appRequest } = require('../appRequest')

describe('GET /heroes', function () {
  this.timeout(10000)

  let expectHeroes = []

  before(async function () {
    ({ data: expectHeroes } = await httpSend('GET', 'https://hahow-recruit.herokuapp.com/heroes'))
  })

  const getResponse = function () {
    return appRequest.get('/heroes').send()
  }

  it('should return every hero', async function () {
    const res = await getResponse()
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal({
      heroes: expectHeroes
    })
  })
})
