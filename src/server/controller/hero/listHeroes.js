const HeroRepo = require('~entity/hero/HeroRepo')
const HeroProfileRepo = require('~entity/heroProfile/HeroProfileRepo')
const AuthService = require('~service/AuthService')
const HttpError = require('~common/error/HttpError')

exports.listHeroes = function ({ name, password }) {
  return (name && password)
    ? listHeroesWithAuth({ name, password })
    : listHeroes()
}

async function listHeroes () {
  const heroes = await HeroRepo.getList()

  return { heroes }
}

async function listHeroesWithAuth ({ name, password }) {
  if (!await AuthService.verifyNamePassword(name, password)) throw new HttpError(401, 'auth failed')
  const heroes = await HeroRepo.getList()
  const heroWithProfileList = await Promise.all(
    heroes.map((hero) => getHeroWithProfile(hero))
  )

  return { heroes: heroWithProfileList }
}

/**
 * @typedef {import('~entity/hero/Hero')} Hero
 */
/**
 * @param {Hero} hero
 */
async function getHeroWithProfile (hero) {
  const profile = await HeroProfileRepo.get(hero.id)
  return {
    ...hero,
    profile: {
      str: profile.str,
      int: profile.int,
      agi: profile.agi,
      luk: profile.luk
    }
  }
}
