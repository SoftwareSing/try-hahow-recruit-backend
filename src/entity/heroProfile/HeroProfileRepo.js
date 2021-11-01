const { httpSend } = require('~common/utils/httpSend')

const HeroProfile = require('./HeroProfile')

exports.get = async function (heroId) {
  const { data } = await httpSend('GET', `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`)
  return new HeroProfile({ heroId, ...data })
}
