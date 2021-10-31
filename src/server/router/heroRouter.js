const express = require('express')

const { getReqHandleFunc } = require('./getReqHandleFunc')
const HeroController = require('../controller/hero/HeroController')

const heroRouter = express.Router()

heroRouter.route('/')
  .get(getReqHandleFunc((req) => {
    return HeroController.listHeroes()
  }))

exports.heroRouter = heroRouter
