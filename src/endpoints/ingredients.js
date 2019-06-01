const Ingredients = require('../models/ingredient')
const { validationResult } = require('express-validator/check');
const service = require('../services/ingredientService')

class Ingredient {
    async index(req, res) {
        try {
            const ingredients = await Ingredients.find({
                "default": true
            })
            return res.status(200).json(ingredients)
        } catch (e) {
            return res.json({ error: true, message: e })
        }
    }

    async store(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
            const ingredient = await Ingredients.create(req.body)
            return res.json(ingredient)
        } catch (e) {
            return res.json({ error: true, message: e })
        }
    }

}

module.exports = new Ingredient()