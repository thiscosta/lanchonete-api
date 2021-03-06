const mongoose = require('mongoose')

const BurgerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        ingredients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient',
                required: true
            }
        ],
        offers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Offer'
            }
        ],
        discount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Burger', BurgerSchema)