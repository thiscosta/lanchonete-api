const express = require('express')

const routes = express.Router()
const sales = require('../../endpoints/sales')
const saleItems = require('../../endpoints/saleItems')
const validations = require('./saleValidations')

routes.get('/', sales.index)
routes.post('/', validations.itemsFromSale, sales.store)
routes.get('/:id', sales.show)
routes.get('/:id/items', saleItems.index)
routes.get('/:sale/items/:item', saleItems.show)

module.exports = routes