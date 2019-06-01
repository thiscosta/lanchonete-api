const Offers = require('../models/offer')

const applyOffers = async (burger) => {
    burger.offers = []
    burger.discount = 0
    await light(burger)
    await meat(burger)
    await cheese(burger)
    burger.price = burger.price.toFixed(2)
}

const light = async (burger) => {
    const hasLettuce = item => item.name === 'Alface'
    const hasBacon = item => item.name === 'Bacon'
    if (burger.ingredients.find(hasLettuce) && !burger.ingredients.find(hasBacon)) {
        const lightOffer = await Offers.findOne({ "name": "Light" })
        const discountAmount = burger.price / 10
        burger.offers.push(lightOffer)
        burger.price -= discountAmount
        burger.discount += discountAmount

    }
    return burger
}

const meat = async (burger) => {
    const hasMeat = item => item.name == 'Hambúrguer de carne'
    const meatIngredient = burger.ingredients.find(hasMeat)
    if (meatIngredient && meatIngredient.quantity >= 3) {
        const discountQuantity = meatIngredient.quantity / 3 >> 0
        const discountAmount = discountQuantity * meatIngredient.price
        const meatOffer = await Offers.findOne({ "name": "Muita carne" })
        burger.offers.push(meatOffer)
        burger.price -= discountAmount
        burger.discount += discountAmount
    }
    return burger
}

const cheese = async (burger) => {
    const hasCheese = item => item.name === 'Queijo'
    const cheeseIngredient = burger.ingredients.find(hasCheese)
    if (cheeseIngredient && cheeseIngredient.quantity >= 3) {
        const discountQuantity = cheeseIngredient.quantity / 3 >> 0
        const discountAmount = discountQuantity * cheeseIngredient.price
        const cheeseOffer = await Offers.findOne({ "name": "Muito queijo" })
        burger.offers.push(cheeseOffer)
        burger.price -= discountAmount
        burger.discount += discountAmount
    }
    return burger
}


module.exports = { applyOffers }