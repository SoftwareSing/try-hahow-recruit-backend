module.exports = class Hero {
  /**
   * @param {Object} obj
   * @param {String} obj.id
   * @param {String} obj.name
   * @param {String} obj.image
   */
  constructor ({ id, name, image }) {
    this.id = id
    this.name = name
    this.image = image
  }
}
