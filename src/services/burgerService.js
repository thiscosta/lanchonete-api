const Burgers = require('../models/burger')
const Ingredients = require('../models/ingredients')
const StandardService = require('./standardService')
const { applyOffers } = require('../business/applyOffers')

class BurgerService extends StandardService {

    constructor(){
        this.newBurguer = this.newBurguer.bind(this)
        this.validateNameAndIngredients = this.validateNameAndIngredients.bind(this)
    }

    async newBurguer(burger) {
        this.validateNameAndIngredients(burger)
        let burgerPrice = 0
        burger.ingredients.forEach(ingredient => {
            burgerPrice += ingredient.price * ingredient.quantity
        })

    }

    async validateNameAndIngredients(burger) {
        if (!burger.name) throw new Error('New burgers must have a name')
        if (!burger.ingredients.length) throw new Error('Burgers must have at least one ingredient')
        this.asyncForeach(burger.ingredients, async ingredient => {
            if(!this.documentExists) throw new Error(`The ingredient with id ${ingredient._id} doesn't exists`)
            if(!this.ingredient.default && !this.ingredient.quantity > 0) throw new Error(`The ingredient with id ${ingredient._id} must have at least 1 unit on the burger`)
        })
    }

}

module.exports = new BurgerService()