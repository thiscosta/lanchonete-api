const SaleItems = require('../models/sale')

class SaleItem {

    async index(req, res) {
        try {
            const items = await SaleItems.find({
                'sale': req.params.sale
            })
            return res.status(200).json(items)
        } catch (e) {
            return res.json({ error: true, e })
        }
    }

    async show(req, res) {
        try {
            const item = await SaleItems.find({
                'sale': req.params.sale,
                '_id': req.params.item
            })
            return res.status(200).json(item)
        } catch (e) {
            return res.json({ error: true, e })
        }
    }
}

module.exports = new SaleItem()