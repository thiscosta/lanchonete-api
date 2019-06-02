const mongoose = require('mongoose')

const SaleItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        burger:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Burger',
            required: true
        },
        sale: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sale',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('SaleItem', SaleItemSchema)