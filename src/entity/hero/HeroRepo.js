const { httpSend } = require('~common/utils/httpSend')

const Hero = require('./Hero')

exports.getList = async function () {
  /**
   * @type { { data: Array } }
   */
  const { data } = await httpSend('GET', 'https://hahow-recruit.herokuapp.com/heroes')
  return data.map((data) => new Hero(data))
}

exports.get = async function (heroId) {
  const { data } = await httpSend('GET', `https://hahow-recruit.herokuapp.com/heroes/${heroId}`)
  return new Hero(data)
}
