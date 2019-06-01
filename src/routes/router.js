const express = require('express')

const routes = express.Router()
const burgerRoutes = require('./burgers/burgers')
const salesRoutes = require('./sales/sales')
const ingredientsRoutes = require('./ingredients/ingredients')

routes.use('/burgers', burgerRoutes)
routes.use('/sales', salesRoutes)
routes.use('/ingredients', ingredientsRoutes)

module.exports = routes