const Sales = require('../models/sale')
const { validationResult } = require('express-validator/check');
const service = require('../services/saleService')

class Sale {

    async index(req, res) {
        try {
            const sales = await Sales.find().populate('items')
            return res.status(200).json(sales)
        } catch (e) {
            return res.json({ error: true, e })
        }
    }

    async store(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
            const sale = await new Promise(async (resolve, reject) => {
                let serviceResponse = await service.buy(req.body, reject)
                resolve(serviceResponse)
            }).catch(e => { return res.json({ error: true, message: e }) })
            return res.json(sale)
        } catch (e) {
            return res.json({ error: true, e })
        }
    }

    async show(req, res) {
        try {
            const sale = await Sales.findById(req.params.id).populate('items')
            return res.status(200).json(sale)
        } catch (e) {
            return res.json({ error: true, e })
        }
    }


}

module.exports = new Sale()