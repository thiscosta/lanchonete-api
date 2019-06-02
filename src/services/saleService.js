const { newSale } = require('../business/newSale')

class SaleService {

    async buy(sale, callback) {
        const createdSale = await newSale(sale, callback)
        return createdSale
    }
}

module.exports = new SaleService()