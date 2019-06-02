const SaleItems = require('../models/saleItem')

class SaleItem {

    async index(req, res) {
        try {
            const item = await SaleItems.find({ "sale": req.params.id }).populate('burger').populate('sale')
            return res.json(item)
        } catch (e) {
            return res.json({ error: true, e })
        }
    }

    async show(req, res) {
        try {
            const item = await SaleItems.find({
                'sale': req.params.sale,
                '_id': req.params.item
            }).populate('burger').populate('sale')
            return res.status(200).json(item)
        } catch (e) {
            return res.json({ error: true, e })
        }
    }
}

module.exports = new SaleItem()