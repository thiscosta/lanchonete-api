const Burgers = require('../models/burger')
const { validationResult } = require('express-validator/check');
const service = require('../services/burgerService')

class Burger {
    async index(req, res) {
        try {
            const burgers = await Burgers.find().populate('ingredients').populate('offers')
            return res.status(200).json(burgers)
        } catch (e) {
            return res.json({ error: true, message: e })
        }
    }

    async store(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
            const burger = await new Promise(async (resolve, reject) => {
                let serviceResponse = await service.newBurger(req.body, reject)
                resolve(serviceResponse)
            }).catch(e => { return res.json({ error: true, message: e }) })
            return res.json(burger)
        } catch (e) {
            return res.json({ error: true, message: e })
        }
    }

    async show(req, res) {
        try {
            const burger = await Burgers.findById(req.params.id).populate('ingredients').populate('offers')
            return res.status(200).json(burger)
        } catch (e) {
            return res.json({ error: true, message: e })
        }
    }
}

module.exports = new Burger()