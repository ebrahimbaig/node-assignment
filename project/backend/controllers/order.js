const Order = require('../models/order');
const Product = require('../models/product');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Place a new order 
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        orderDeals,
        shippingInfo,
        itemsPrice,
        salesTax,
        shippingRate,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        orderDeals,
        shippingInfo,
        itemsPrice,
        salesTax,
        shippingRate,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        customer_id: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})


// Get single order of logged in user
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findOne({ $and: [{ _id: req.params.id }, { customer_id: req.user._id }] })

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        })
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ customer_id: req.user._id })

    res.status(200).json({
        success: true,
        count: orders.length,
        orders
    })
})


// Get all orders -- For Admins
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        count: orders.length,
        totalAmount,
        orders
    })
})

// Update / Process order -- For Admins
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        })
    }

    if (req.body.orderStatus != null) {
        if (order.orderStatus === 'Delivered') {
            return res.status(400).json({
                message: 'You have already delivered this order'
            })
        }
        order.orderStatus = req.body.orderStatus
        if (req.body.orderStatus === "Delivered") {
            order.deliveredAt = Date.now()
        }
    }
    await order.save()
    res.status(200).json({
        success: true,
        order
    })
})

// Delete order -- For Admins
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        })
    }

    await order.remove()

    res.status(200).json({
        success: true,
        order
    })
})