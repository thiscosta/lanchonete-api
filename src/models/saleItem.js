const mongoose = require('mongoose')

const SaleItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        burgers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Burger',
                required: true
            }
        ],
        offers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Offer'
            }
        ],
        sale: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Sale',
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('SaleItem', SaleItemSchema)