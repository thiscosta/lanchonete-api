const { check, body } = require('express-validator/check');
const Burgers = require('../../models/burger')
const { asyncForEach } = require('../../utils/asyncUtils')
const { isValidObjectID, documentExists } = require('../../utils/mongooseUtils')

const itemsFromSale = [
    check('items').isLength({ min: 1 }).withMessage('The sale must have at least 1 item'),
    body('items').custom(async (items) => {
        await asyncForEach(items, async (burger) => {
            if (burger.id && !isValidObjectID(burger.id)) throw new Error('The provided id isn\'t valid')
            let exists = await documentExists(Burgers, burger.id)
            if (burger.id && !exists) throw new Error('The burger with id ' + burger.id + ' doesn\'t exists')
        })
        return true
    }),
]


module.exports = { itemsFromSale }