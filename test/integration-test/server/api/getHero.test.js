const faker = require('faker')
const { expect } = require('chai')

const { httpSend } = require('~common/utils/httpSend')
const { appRequest } = require('../appRequest')

describe('GET /heroes/:heroId', function () {
  this.timeout(10000)

  let heroId = ''
  let expectHero = {}
  let heroes = []

  before(async function () {
    ({ data: heroes } = await httpSend('GET', 'https://hahow-recruit.herokuapp.com/heroes'))
  })

  beforeEach(function () {
    expectHero = faker.random.arrayElement(heroes)
    heroId = expectHero.id
  })

  const getResponse = function () {
    return appRequest.get(`/heroes/${heroId}`).send()
  }

  it('should return hero', async function () {
    const res = await getResponse()
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal(expectHero)
  })

  describe('with auth', function () {
    let name = 'hahow'
    let password = 'rocks'
    let expectProfile = {}

    beforeEach(async function () {
      name = 'hahow'
      password = 'rocks';
      ({ data: expectProfile } = await httpSend('GET', `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`))
    })

    const getResponse = function () {
      return appRequest.get(`/heroes/${heroId}`)
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

    it('should return hero with profile', async function () {
      const res = await getResponse()
      expect(res).to.have.status(200)
      expect(res.body).to.deep.equal({ ...expectHero, profile: expectProfile })
    })
  })
})
