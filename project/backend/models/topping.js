const mongoose = require("mongoose")

const toppingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Extra Topping", "Extra Veggies"]
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image_url: {
        type: String,
        //required: true
    },
    topping_status: {
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
}, {timestamps: true})

module.exports = mongoose.model("Topping", toppingSchema);
