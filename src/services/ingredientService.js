const Ingredients = require('../models/ingredient')

class IngredientsService {

    constructor() {
        this.fillNewIngredient = this.fillNewIngredient.bind(this)
        this.newIngredient = this.newIngredient.bind(this)
    }

    async newIngredient(ingredient) {
        const storedIngredient = await Ingredients.findById(ingredient._id)
        if (storedIngredient && ingredient.quantity > 0) {
            this.fillNewIngredient(ingredient, storedIngredient)
            const newIngredient = await Ingredients.create(ingredient)
            return newIngredient
        }
        return null
    }

    fillNewIngredient(ingredient, stored) {
        ingredient.name = stored.name
        ingredient.default = false
        ingredient.price = stored.price.toFixed(2)
        delete ingredient._id
    }


}

module.exports = new IngredientsService()