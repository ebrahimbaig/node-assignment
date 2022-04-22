const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            product_name: {
                type: String,
                required: true
            },
            image_url: {
                type: String,
                //required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unit_price: {
                type: Number,
                required: true
            },
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            toppings: [
                {
                    topping_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Topping'
                    },
                    topping_name: {
                        type: String,
                        required: true
                    },
                    category: {
                        type: String,
                        required: true
                    },
                    unit_price: {
                        type: Number,
                        required: true
                    },
                },
            ],
        }
    ],
    orderDeals: [
        {
            deal_name: {
                type: String,
                required: true
            },
            image_url: {
                type: String,
                //required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unit_price: {
                type: Number,
                required: true
            },
            deal_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Deal'
            },
            toppings: [
                {
                    topping_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Topping'
                    },
                    topping_name: {
                        type: String,
                        required: true
                    },
                    category: {
                        type: String,
                        required: true
                    },
                    unit_price: {
                        type: Number,
                        required: true
                    },
                },
            ],
        }
    ],
    paymentInfo: {
        id: {
            type: String
        },
        paymentmethod: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidAt: {
        type: Date
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    salesTax: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingRate: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        enum: {
            values: [
                'Processing',
                'Confirmed',
                'onDelivery',
                'Delivered',
                'Cancelled',
                'Rejected'
            ],
            message: 'Incorrect Order Status'
        },
        default: 'Processing',
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Order', orderSchema)