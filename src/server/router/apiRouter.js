const express = require('express')

const apiRouter = express.Router()

apiRouter.route('/').get(function (req, res) {
  res.status(200).json('hahow recruit backend API')
})

exports.apiRouter = apiRouter
