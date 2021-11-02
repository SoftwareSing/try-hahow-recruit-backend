const HahowApiError = require('~common/error/HahowApiError')
const { callHahowApi } = require('~common/utils/callHahowApi')

const HeroProfile = require('./HeroProfile')

exports.get = async function (heroId) {
  try {
    const { data } = await callHahowApi('GET', `/heroes/${heroId}/profile`)
    return new HeroProfile({ heroId, ...data })
  } catch (err) {
    if (err instanceof HahowApiError) return undefined
    else throw err
  }
}
