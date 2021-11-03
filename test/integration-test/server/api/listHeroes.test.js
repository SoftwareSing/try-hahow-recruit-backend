const faker = require('faker')
const { expect } = require('chai')

const { callHahowApi } = require('~common/utils/callHahowApi')
const { appRequest } = require('../appRequest')

describe('GET /heroes', function () {
  this.timeout(10000)

  let expectHeroes = []

  before(async function () {
    ({ data: expectHeroes } = await callHahowApi('GET', '/heroes'))
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

  describe('with auth', function () {
    let name = 'hahow'
    let password = 'rocks'
    let expectAuthHeroes = []

    before(async function () {
      expectAuthHeroes = await Promise.all(
        expectHeroes.map(async (hero) => {
          const { data } = await callHahowApi('GET', `/heroes/${hero.id}/profile`)
          return { ...hero, profile: data }
        })
      )
    })

    beforeEach(function () {
      name = 'hahow'
      password = 'rocks'
    })

    const getResponse = function () {
      return appRequest.get('/heroes')
        .set('Name', name)
        .set('Password', password)
        .send()
    }

    it('should return status 401 if name error', async function () {
      name = faker.lorem.word()

      const res = await getResponse()
      expect(res).to.have.status(401)
      expect(res.body).to.deep.equal({ error: 'auth failed' })
    })

    it('should return status 401 if password error', async function () {
      password = faker.random.alphaNumeric(faker.datatype.number({ min: 3, max: 20 }))

      const res = await getResponse()
      expect(res).to.have.status(401)
      expect(res.body).to.deep.equal({ error: 'auth failed' })
    })

    it('should return heroes with profile', async function () {
      const res = await getResponse()
      expect(res).to.have.status(200)
      expect(res.body).to.deep.equal({ heroes: expectAuthHeroes })
    })
  })
})
