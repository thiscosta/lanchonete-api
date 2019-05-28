const mongoose = require('mongoose')

const SaleSchema = mongoose.Schema(
    {
        price: {
            type: Number, 
            required: true
        },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SaleItem',
                required: true
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Sale', SaleSchema)