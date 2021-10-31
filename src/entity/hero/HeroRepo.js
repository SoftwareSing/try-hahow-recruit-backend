const { httpSend } = require('~common/utils/httpSend')

const Hero = require('./Hero')

exports.getList = async function () {
  const { data } = await httpSend('GET', 'https://hahow-recruit.herokuapp.com/heroes')
  return data.map((data) => new Hero(data))
}
