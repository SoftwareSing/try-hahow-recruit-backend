const express = require('express')

const { heroRouter } = require('./heroRouter')

const apiRouter = express.Router()

apiRouter.route('/').get(function (req, res) {
  res.status(200).json('Hello API')
})

apiRouter.use('/heroes', heroRouter)

exports.apiRouter = apiRouter
