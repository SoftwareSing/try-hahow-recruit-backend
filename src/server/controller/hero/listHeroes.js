const HeroRepo = require('~entity/hero/HeroRepo')

exports.listHeroes = async function () {
  const heroes = await HeroRepo.getList()

  return { heroes }
}
