const HeroRepo = require('~entity/hero/HeroRepo')
const HeroProfileRepo = require('~entity/heroProfile/HeroProfileRepo')
const AuthService = require('~service/AuthService')
const HttpError = require('~common/error/HttpError')

exports.getHero = function ({ heroId, name, password }) {
  return (name && password)
    ? getHeroWithAuth(heroId, { name, password })
    : getHero(heroId)
}

async function getHero (heroId) {
  const hero = await getHeroOrThrow(heroId)
  return hero
}

async function getHeroWithAuth (heroId, { name, password }) {
  if (!await AuthService.verifyNamePassword(name, password)) throw new HttpError(401, 'auth failed')
  const hero = await getHeroOrThrow(heroId)
  const heroProfile = await HeroProfileRepo.get(heroId)

  return {
    ...hero,
    profile: {
      str: heroProfile.str,
      int: heroProfile.int,
      agi: heroProfile.agi,
      luk: heroProfile.luk
    }
  }
}

async function getHeroOrThrow (heroId) {
  const hero = await HeroRepo.get(heroId)
  if (!hero) throw new HttpError(404, 'hero not found')
  return hero
}
