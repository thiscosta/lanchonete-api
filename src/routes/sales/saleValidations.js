const { check, body } = require('express-validator/check');
const mongoose = require('mongoose')
const Burgers = require('../../models/burger')

const itemsFromSale = [
    check('items').isLength({ min: 1 }).withMessage('The sale must have at least 1 item'),
    // body('items').custom(async (items) => {
    //     return new Promise((resolve, reject) => {
    //         items.forEach(async burger => {
    //             if (burger.id && !isValidObjectID(burger.id)) throw new Error('The provided id isn\'t valid')
    //             let exists = await burgerExists(burger.id)
    //             if (burger.id && !exists) throw new Error('The burger with id ' + burger.id + ' doesn\'t exists')
    //             resolve()
    //         })
    //         return true
    //     })
    // }),
]

const burgerExists = async (id) => {
    const burger = await Burgers.findById(id)
    return burger ? true : false
}

const isValidObjectID = (str) => {
    str = str + '';
    var len = str.length, valid = false;
    if (len == 12 || len == 24) {
        valid = /^[0-9a-fA-F]+$/.test(str);
    }
    return valid;
}

module.exports = { itemsFromSale }