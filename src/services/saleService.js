const Sales = require('../models/sale')
const { newSale } = require('../business/newSale')
class SaleService {

    constructor() {
        this.buy = this.buy.bind(this)
    }

    async buy(sale, callback) {
        const createdSale = await newSale(sale, callback)
        return createdSale
    }
}

module.exports = new SaleService()