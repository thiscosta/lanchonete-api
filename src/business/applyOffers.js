const Offers = require('../models/offer')

const applyOffers = async (burger) => {
    burger.offers = []
    burger.discount = 0
    let applyedOffer = false

    applyedOffer = await light(burger)
    if (applyedOffer) await applyOffer(burger, 'Light')

    applyedOffer = await meat(burger)
    if (applyedOffer) await applyOffer(burger, 'Muita carne')

    applyedOffer = await cheese(burger)
    if (applyedOffer) await applyOffer(burger, 'Muito queijo')

    burger.price = burger.price.toFixed(2)
}

const applyOffer = async (burger, offerName) => {
    const offer = await Offers.findOne({ "name": offerName })
    if (offer) burger.offers.push(offer)
}

const light = async (burger) => {
    const hasLettuce = item => item.name === 'Alface'
    const hasBacon = item => item.name === 'Bacon'
    if (burger.ingredients.find(hasLettuce) && !burger.ingredients.find(hasBacon)) {
        const discountAmount = burger.price / 10
        burger.discount += discountAmount
        return true
    }
    return false
}

const meat = async (burger) => {
    const hasMeat = item => item.name == 'Hambúrguer de carne'
    const meatIngredient = burger.ingredients.find(hasMeat)
    if (meatIngredient && meatIngredient.quantity >= 3) {
        const discountQuantity = meatIngredient.quantity / 3 >> 0
        const discountAmount = discountQuantity * meatIngredient.price
        burger.discount += discountAmount
        return true
    }
    return false
}

const cheese = async (burger) => {
    const hasCheese = item => item.name === 'Queijo'
    const cheeseIngredient = burger.ingredients.find(hasCheese)
    if (cheeseIngredient && cheeseIngredient.quantity >= 3) {
        const discountQuantity = cheeseIngredient.quantity / 3 >> 0
        const discountAmount = discountQuantity * cheeseIngredient.price
        burger.discount += discountAmount
        return true
    }
    return false
}


module.exports = { applyOffers, light, meat, cheese }