const HahowApiError = require('../error/HahowApiError')
const { httpSend } = require('./httpSend')

/**
 * 協助 call hahow 的 API ，會在 API 出現 status 200 的錯誤時自動重試，最多嘗試3次
 * @param {'GET' | 'POST'} method
 * @param {String} path
 * @param {Any} [data]
 */
exports.callHahowApi = async function (method, path, data) {
  let result
  const maxRetryTime = 3
  const url = (new URL(path, 'https://hahow-recruit.herokuapp.com')).href
  for (let i = 0; i < maxRetryTime; i += 1) {
    result = await httpSend(method, url, data)
    if (!isHahowApiBackendError(result.data)) return result
  }
  const { code, message } = result.data
  throw new HahowApiError({ method, url, data, code, message })
}

function isHahowApiBackendError (data) {
  return isObject(data) && typeof data.code === 'number'
}

function isObject (input) {
  return typeof input === 'object' && input !== null
}
