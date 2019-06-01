const express = require('express')

const routes = express.Router()
const ingredients = require('../../endpoints/ingredients')

routes.get('/', ingredients.index)
routes.post('/', ingredients.store )

module.exports = routes