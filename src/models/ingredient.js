const mongoose = require('mongoose')

const IngredientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        default: {
            type: Boolean,
            required: true,
            default: false
        },
        quantity: {
            type: Number
        },
        burger: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Burger'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Ingredient', IngredientSchema)