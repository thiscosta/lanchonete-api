const Burgers = require('../models/burger')
const Ingredients = require('../models/ingredient')
const IngredientService = require('../services/ingredientService')
const { asyncForEach } = require('../utils/asyncUtils')
const { applyOffers } = require('./applyOffers')
let reject = () => { }

const createBurger = async (burger, callback) => {
    reject = callback
    if (!burger.name) reject('New burgers must have a name')
    if (!burger.ingredients.length) reject('Burgers must have at least one ingredient')
    await fillIngredients(burger)
    await calculatePrice(burger)
    await applyOffers(burger)
    burger = await Burgers.create(burger)
    await fillBurgerId(burger)
    return burger
}

const fillIngredients = async (burger) => {
    let newIngredients = []
    await asyncForEach(burger.ingredients, async (ingredient) => {
        let storedIngredient = await Ingredients.findById(ingredient._id)
        if (!storedIngredient) reject(`The ingredient with id ${ingredient._id} doesn't exists`)
        if (!ingredient.quantity > 0) reject(`The ingredient with id ${ingredient._id} must have at least 1 unit on the burger`)
        ingredient = await IngredientService.newIngredient(ingredient)
        if (!ingredient) reject(`Error during ingredient ${ingredient._id} insertion, please try again`)
        newIngredients.push(ingredient)
    })
    burger.ingredients = newIngredients
}

const calculatePrice = (burger) => {
    let burgerPrice = 0
    burger.ingredients.forEach(ingredient => {
        burgerPrice += ingredient.price * ingredient.quantity
    })
    burger.price = burgerPrice
}

const fillBurgerId = async (burger) => {
    await asyncForEach(burger.ingredients, async (ingredient) => {
        ingredient.burger = burger._id
        await ingredient.save()
    })
}

module.exports = { createBurger, calculatePrice }