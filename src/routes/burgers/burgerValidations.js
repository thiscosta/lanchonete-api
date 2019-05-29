const { check, body } = require('express-validator/check');
const Ingredients = require('../../models/ingredient')
const { asyncForEach } = require('../../utils/asyncUtils')
const { isValidObjectID, documentExists } = require('../../utils/mongooseUtils')

const ingredientsFromBurger = [
    check('ingredients').isLength({ min: 1 }).withMessage('The burguer must have at least 1 ingredient'),
    body('ingredients').custom(async (ingredients) => {
        await asyncForEach(ingredients, async (ingredient) => {
            if (!ingredient._id) throw new Error(`The ingredient must have an id`)
            if (!isValidObjectID(ingredient._id)) throw new Error(`The id ${ingredient._id} isn't valid for ingredients`)
            let ingredientExists = await documentExists(Ingredients, ingredient._id)
            if (!ingredientExists) throw new Error(`The ingredient with id ${ingredient._id} doesn't exists`)
            if (!ingredient.quantity || parseInt(ingredient.quantity) <= 0) throw new Error(`The ingredient with id ${ingredient._id} must have at least 1 unity`)
        })
        return true
    })
]


module.exports = { ingredientsFromBurger }