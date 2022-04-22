const mongoose = require('mongoose')

const DealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Deal name'],
        trim: true,
        unique: true,
        maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
        type: String,
        //required: [true, 'Please enter product description'],
    },
    category: {
        type: String,
        required: [true, 'Please select category for this Deal'],
        enum: {
            values: [
                'Special Deals',
                'Premium Deals',
                'Midnight Deals'
            ],
            message: 'Please select correct category for Deal'
        }
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    Items: [
        {
            product_category: {
                type: String,
                required: [true, 'Please select category for the product'],
                enum: {
                    values: [
                        'Pizzas',
                        'Beverages',
                        'Sauces'
                    ],
                    message: 'Please select correct category for the product'
                }
            },
            product_size: {
                type: String
            },
            product_quantity: {
                type: Number,
                required: true,
            },
        }
    ],
    image_url: {
        type: String,
        //required: true
    },
    deal_status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Deal', DealSchema);