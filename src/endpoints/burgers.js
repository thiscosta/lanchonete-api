const Burgers = require('../models/burger')
const { validationResult } = require('express-validator/check');
class Burger {
    async index(req, res) {
        try {
            const burgers = await Burgers.find().populate('ingredients')
            return res.status(200).json(burgers)
        } catch (e) {
            return res.json({ error: true, message: e })
        }
    }

    async store(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
            return res.json({ error: false })
        } catch (e) {
            return res.json({ error: true, message: e })
        }
    }

    async show(req, res) {
        try {
            const burger = await Burgers.findById(req.params.id).populate('ingredients')
            return res.status(200).json(burger)
        } catch (e) {
            return res.json({ error: true, message: e })
        }
    }
}

module.exports = new Burger()