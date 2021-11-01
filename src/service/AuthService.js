const { httpSend } = require('~common/utils/httpSend')
const RequestError = require('~common/error/RequestError')

exports.verifyNamePassword = async function (name, password) {
  try {
    await httpSend('POST', 'https://hahow-recruit.herokuapp.com/auth', {
      name,
      password
    })
    return true
  } catch (err) {
    if (err instanceof RequestError) return false
    else throw err
  }
}
