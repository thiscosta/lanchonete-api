const Sales = require('../models/sale')
const SaleItems = require('../models/saleItem')
const Burgers = require('../models/burger')
const { asyncForEach } = require('../utils/asyncUtils')
const { documentExists } = require('../utils/mongooseUtils')

let reject = () => { }

const newSale = async (sale, callback) => {
    reject = callback
    await validateSale(sale)
    const items = await createSaleItems(sale)
    sale = await Sales.create({ price: 0, items: [] })
    await fillSaleAndItems(sale, items)
    return sale
}

const fillSaleAndItems = async (sale, items) => {
    await asyncForEach(items, async item => {
        item.sale = sale._id
        item = await SaleItems.create(item)
        sale.price += item.price
        sale.items.push(item)
    })
    await sale.save()
}


const createSaleItems = async (sale) => {
    await asyncForEach(sale.items, async item => {
        item.burger = await Burgers.findById(item.burger).populate('ingredients').populate('offers')
        item.price = ((item.burger.price * item.quantity) - item.burger.discount).toFixed(2)
        item.name = item.quantity + ' - ' + item.burger.name
    })
    return sale.items
}

const validateSale = async (sale) => {
    if (!sale.items) reject(`The sale must have at least 1 item`)
    await asyncForEach(sale.items, item => {
        if (!item.burger) reject(`The item must have a burger`)
        if (!item.quantity || !item.quantity > 0) reject(`The burger quantity must be greater than 0`)
        if (!item.burger) reject(`The burger must have an id`)
        if (!documentExists(Burgers, item.burger)) reject(`The burger with id ${item.burger} doesn't exists`)
    })
}

module.exports = { newSale }