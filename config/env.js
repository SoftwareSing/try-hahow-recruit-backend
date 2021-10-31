const ENV = process.env.NODE_ENV

const test = 'test'
const development = 'development'
const production = 'production'

module.exports = {
  ENV,
  envKeyword: {
    test,
    development,
    production
  }
}
