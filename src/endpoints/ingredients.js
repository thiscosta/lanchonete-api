const Ingredients = require('../models/ingredient')

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

}

module.exports = new Ingredient()