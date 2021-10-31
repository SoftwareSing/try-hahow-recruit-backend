const { expect } = require('chai')

const appRequest = require('../appRequest')

describe('GET /heroes', function () {
  const expectHeroes = [
    {
      id: '1',
      name: 'Daredevil',
      image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg'
    },
    {
      id: '2',
      name: 'Thor',
      image: 'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg'
    }
  ]

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
