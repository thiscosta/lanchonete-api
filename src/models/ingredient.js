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
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Ingredient', IngredientSchema)