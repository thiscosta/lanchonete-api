const express = require('express')

const routes = express.Router()
const sales = require('../../endpoints/sales')
const saleItems = require('../../endpoints/saleItems')
const { itemsFromSale } = require('./saleValidations')

routes.get('/', sales.index)
routes.post('/', itemsFromSale, sales.store)
routes.get('/:id', sales.show)
routes.get('/:id/items', saleItems.index)
routes.get('/:sale/items/:item', saleItems.show)

module.exports = routes