const express = require('express')

const routes = express.Router()
const burgers = require('../../endpoints/burgers')

routes.get('/', burgers.index)
routes.get('/:id', burgers.show)

module.exports = routes