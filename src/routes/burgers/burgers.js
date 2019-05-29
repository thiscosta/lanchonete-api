const express = require('express')

const routes = express.Router()
const burgers = require('../../endpoints/burgers')

const { ingredientsFromBurger } = require('./burgerValidations')

routes.get('/', burgers.index)
routes.post('/', ingredientsFromBurger, burgers.store )
routes.get('/:id', burgers.show)

module.exports = routes