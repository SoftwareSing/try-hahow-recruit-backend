const { callHahowApi } = require('~common/utils/callHahowApi')
const RequestError = require('~common/error/RequestError')

exports.verifyNamePassword = async function (name, password) {
  try {
    await callHahowApi('POST', '/auth', {
      name,
      password
    })
    return true
  } catch (err) {
    if (err instanceof RequestError) return false
    else throw err
  }
}
