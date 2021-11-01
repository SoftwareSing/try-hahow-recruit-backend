module.exports = class HeroProfile {
  /**
   * @param {Object} obj
   * @param {String} obj.heroId
   * @param {Number} obj.str
   * @param {Number} obj.int
   * @param {Number} obj.agi
   * @param {Number} obj.luk
   */
  constructor ({ heroId, str, int, agi, luk }) {
    this.heroId = heroId
    this.str = str
    this.int = int
    this.agi = agi
    this.luk = luk
  }
}
