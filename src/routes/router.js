const express = require('express')

const routes = express.Router()
const burgerRoutes = require('./burgers/burgers')
const salesRoutes = require('./sales/sales')

routes.use('/burgers', burgerRoutes)
routes.use('/sales', salesRoutes)

module.exports = routes