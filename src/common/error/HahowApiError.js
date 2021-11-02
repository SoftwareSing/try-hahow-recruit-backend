module.exports = class HahowApiError extends Error {
  /**
   * @param {Object} obj
   * @param {String} obj.method
   * @param {String} obj.url
   * @param {Any} obj.data
   * @param {Number} obj.code
   * @param {String} obj.message
   */
  constructor ({ method, url, data, code, message }) {
    super(`request error: ${method} ${url}\n${JSON.stringify(data)}\n{ code: ${code}, message: ${message} }`)
    this.method = method
    this.url = url
    this.data = data
    this.resData = { code, message }
  }
}
