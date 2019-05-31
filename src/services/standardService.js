const { documentExists } = require('../utils/mongooseUtils')
const { asyncForeach } = require('../utils/asyncUtils')

class StandardService {

    constructor() {
        this.documentExists = documentExists
        this.asyncForeach = asyncForeach
    }

}

module.exports = StandardService