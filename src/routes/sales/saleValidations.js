const { check, body } = require('express-validator/check');
const Burgers = require('../../models/burger')
const Ingredients = require('../../models/ingredient')
const { asyncForEach } = require('../../utils/asyncUtils')
const { isValidObjectID, documentExists } = require('../../utils/mongooseUtils')

const itemsFromSale = [
    check('items').isLength({ min: 1 }).withMessage('The sale must have at least 1 item'),
    body('items').custom(async (items) => {
        await asyncForEach(items, async (burger) => {
            if (!burger._id) throw new Error(`The burger must have an id`)
            if (!isValidObjectID(burger._id)) throw new Error(`The id ${burger._id} isn't valid for burgers`)
            let burgerExists = await documentExists(Burgers, burger._id)
            if (!burgerExists) throw new Error(`The burger with id ${burger._id} doesn't exists`)

            if (!burger.ingredients) throw new Error(`The burger must have at least 1 ingredient`)

            await asyncForEach(burger.ingredients, async (ingredient) => {
                if (!ingredient.quantity || parseInt(ingredient.quantity) <= 0) throw new Error(`The ingredient with id ${ingredient._id} must have at least 1 unity`)
                if (ingredient._id && !isValidObjectID(ingredient._id)) throw new Error(`The id ${ingredient._id} isn't valid for ingredients`)
                let ingredientExists = await documentExists(Ingredients, ingredient._id)
                if (!ingredientExists) throw new Error(`The ingredient with id ${ingredient._id} doesn't exists`)
            })

        })
        return true
    }),
]


module.exports = { itemsFromSale }