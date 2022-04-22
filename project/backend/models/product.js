const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters'],
        unique: true
    },
    description: {
        type: String,
        //required: [true, 'Please enter product description'],
    },
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Pizzas',
                'Beverages',
                'Sauces'
            ],
            message: 'Please select correct category for product'
        }
    },
    PizzaDetails: {
        crust: {
            crust1: {
                type: String,
                //default: 0,
            },
            crust2: {
                type: String,
                //default: 0,
            },
        },
        size: {
            small: {
                type: Number,
                //default: 0,
            },
            regular: {
                type: Number,
                //default: 0,
            },
            large: {
                type: Number,
                //default: 0,
            },
            jumbo: {
                type: Number,
                //default: 0,
            }
        }
    },
    BeverageDetails: {
        size: {
            type: String,
            //required: true,
            enum: {
                values: [
                    'Large Drink',
                    "Small Drink"
                ]
            }
        },
        price: {
            type: Number,
            //required: true
            //default: 0
        }
    },
    SauceDetails: {
        price: {
            type: Number,
            //required: true
            //default: 0
        }
    },
    image_url: {
        type: String,
        //required: true
    },
    product_status: {
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

module.exports = mongoose.model('Product', productSchema);