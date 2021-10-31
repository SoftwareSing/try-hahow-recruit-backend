const chai = require('chai')
const chaiHttp = require('chai-http')

const { expressApp } = require('~server/expressApp')

const app = expressApp()
chai.use(chaiHttp)
const appRequest = chai.request(app).keepOpen()

exports.appRequest = appRequest
