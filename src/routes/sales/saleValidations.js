const { check, body } = require('express-validator/check');
const Burgers = require('../../models/burger')
const Ingredients = require('../../models/ingredient')
const { asyncForEach } = require('../../utils/asyncUtils')
const { isValidObjectID, documentExists } = require('../../utils/mongooseUtils')

const validateNewSale = [
    check('items').isLength({ min: 1 }).withMessage('The sale must have at least 1 item'),
    body('items').custom(async (items) => {
        await asyncForEach(items, async (item) => {
            if (!item.burger) throw new Error(`The item must have an burger`)
            if (!item.quantity || !item.quantity > 0) throw new Error(`The item must have a quantity greater than 0`)
            if (!isValidObjectID(item.burger)) throw new Error(`The id ${item.burger} isn't valid for burgers`)
            let burgerExists = await documentExists(Burgers, item.burger)
            if (!burgerExists) throw new Error(`The burger with id ${item.burger} doesn't exists`)
        })
        return true
    }),
]


module.exports = { validateNewSale }