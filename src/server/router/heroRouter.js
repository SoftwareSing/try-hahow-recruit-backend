const express = require('express')

const { getReqHandleFunc } = require('./getReqHandleFunc')
const HeroController = require('../controller/hero/HeroController')

const heroRouter = express.Router()

heroRouter.route('/')
  .get(getReqHandleFunc((req) => {
    return HeroController.listHeroes()
  }))
heroRouter.route('/:heroId')
  .get(getReqHandleFunc((req) => {
    return HeroController.getHero({
      heroId: req.params.heroId
    })
  }))

exports.heroRouter = heroRouter
