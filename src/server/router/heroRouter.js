const express = require('express')

const { getReqHandleFunc } = require('./getReqHandleFunc')
const HeroController = require('../controller/hero/HeroController')

const heroRouter = express.Router()

heroRouter.route('/')
  .get(getReqHandleFunc((req) => {
    return HeroController.listHeroes({
      name: req.header('name'),
      password: req.header('password')
    })
  }))
heroRouter.route('/:heroId')
  .get(getReqHandleFunc((req) => {
    return HeroController.getHero({
      heroId: req.params.heroId,
      name: req.header('name'),
      password: req.header('password')
    })
  }))

exports.heroRouter = heroRouter
