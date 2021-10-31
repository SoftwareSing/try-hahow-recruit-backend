const express = require('express')

const apiRouter = express.Router()

apiRouter.route('/').get(function (req, res) {
  res.status(200).json('Hello API')
})

exports.apiRouter = apiRouter
