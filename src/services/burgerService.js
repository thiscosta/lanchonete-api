const { createBurger } = require('../business/createBurger')
const StandardService = require('./standardService')

class BurgerService extends StandardService {

    constructor() {
        super()
        this.newBurger = this.newBurger.bind(this)
    }

    async newBurger(burger, callback) {
        const createdBurger = await createBurger(burger, callback)
        return createdBurger
    }

}

module.exports = new BurgerService()