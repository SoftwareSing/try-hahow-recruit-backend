const axios = require('axios').default

const RequestError = require('../error/RequestError')

/**
 * @param {'GET' | 'POST'} method
 * @param {String} path
 * @param {Any} [data]
 */
exports.httpSend = async function send (method, path, data) {
  try {
    const res = await axios({
      method,
      url: path,
      data
    })

    return { data: res.data }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new RequestError({
        method,
        url: path,
        statusCode: err.response.status,
        data: err.response.data
      })
    } else {
      throw err
    }
  }
}
