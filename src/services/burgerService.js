const Burgers = require('../models/burger')
const Ingredients = require('../models/ingredient')
const StandardService = require('./standardService')
const { applyOffers } = require('../business/applyOffers')
const { asyncForEach } = require('../utils/asyncUtils')
const IngredientService = require('./ingredientService')

class BurgerService extends StandardService {

    constructor() {
        super()
        this.newBurguer = this.newBurguer.bind(this)
        this.fillIngredients = this.fillIngredients.bind(this)
        this.calculatePrice = this.calculatePrice.bind(this)
        this.callback
        this.fillBurgerId = this.fillBurgerId.bind(this)
    }

    async newBurguer(burger, callback) {
        this.callback = callback
        if (!burger.name) this.callback('New burgers must have a name')
        if (!burger.ingredients.length) this.callback('Burgers must have at least one ingredient')
        await this.fillIngredients(burger)
        await this.calculatePrice(burger)
        await applyOffers(burger)
        burger = await Burgers.create(burger)
        await this.fillBurgerId(burger)
        return burger
    }

    async fillIngredients(burger) {
        let newIngredients = []
        await asyncForEach(burger.ingredients, async (ingredient) => {
            let storedIngredient = await Ingredients.findById(ingredient._id)
            if (!storedIngredient) this.callback(`The ingredient with id ${ingredient._id} doesn't exists`)
            if (!ingredient.quantity > 0) this.callback(`The ingredient with id ${ingredient._id} must have at least 1 unit on the burger`)
            ingredient = await IngredientService.newIngredient(ingredient)
            if (!ingredient) this.callback(`Error during ingredient ${ingredient._id} insertion, please try again`)
            newIngredients.push(ingredient)
        })
        burger.ingredients = newIngredients
    }

    async calculatePrice(burger) {
        let burgerPrice = 0
        burger.ingredients.forEach(ingredient => {
            burgerPrice += ingredient.price * ingredient.quantity
        })
        burger.price = burgerPrice
    }

    async fillBurgerId(burger) {
        await asyncForEach(burger.ingredients, async (ingredient) => {
            ingredient.burger = burger._id
            await ingredient.save()
        })
    }

}

module.exports = new BurgerService()