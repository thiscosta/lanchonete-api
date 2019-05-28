const Sales = require('../models/sale')
const { validationResult } = require('express-validator/check');

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
            return res.json({ error: false })
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