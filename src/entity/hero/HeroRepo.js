const HahowApiError = require('~common/error/HahowApiError')
const { callHahowApi } = require('~common/utils/callHahowApi')

const Hero = require('./Hero')

exports.getList = async function () {
  try {
    /**
     * @type { { data: Array } }
     */
    const { data } = await callHahowApi('GET', '/heroes')
    return data.map((data) => new Hero(data))
  } catch (err) {
    if (err instanceof HahowApiError) return []
    else throw err
  }
}

exports.get = async function (heroId) {
  try {
    const { data } = await callHahowApi('GET', `/heroes/${heroId}`)
    return new Hero(data)
  } catch (err) {
    if (err instanceof HahowApiError) return undefined
    else throw err
  }
}
