module.exports = class RequestError extends Error {
  /**
   * @param {Object} obj
   * @param {String} obj.method
   * @param {String} obj.url
   * @param {Number} obj.statusCode
   * @param {Any} obj.data
   */
  constructor ({ method, url, statusCode, data }) {
    super(`request error: ${statusCode} ${method} ${url}\n${JSON.stringify(data)}`)
    this.method = method
    this.url = url
    this.statusCode = statusCode
    this.data = data
  }
}
