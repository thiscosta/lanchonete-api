const express = require('express')

const routes = express.Router()
const ingredients = require('../../endpoints/ingredients')

routes.get('/', ingredients.index)

module.exports = routes