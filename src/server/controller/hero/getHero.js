const HeroRepo = require('~entity/hero/HeroRepo')

exports.getHero = async function ({ heroId }) {
  const hero = await HeroRepo.get(heroId)

  return hero
}
