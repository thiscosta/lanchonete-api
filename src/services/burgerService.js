const { createBurger } = require('../business/createBurger')

class BurgerService {

    async newBurger(burger, callback) {
        const createdBurger = await createBurger(burger, callback)
        return createdBurger
    }

}

module.exports = new BurgerService()