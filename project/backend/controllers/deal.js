const Deal = require('../models/deal')
const User = require("../models/user")
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


//Add new Deal -- For Admins
exports.newDeal = catchAsyncErrors(async (req, res, next) => {

    req.body.createdBy = req.user._id;
    const deal = await Deal.create(req.body);

    res.status(201).json({
        success: true,
        deal
    })
})


// Get all deals 
exports.getallDeals = catchAsyncErrors(async (req, res, next) => {

    if (req.user != null) {
        const deals = await Deal.find();
        res.status(200).json({
            success: true,
            count: deals.length,
            deals
        })
    }
    else {
        const deals = await Deal.find({ deal_status: "active" });
        res.status(200).json({
            success: true,
            count: deals.length,
            deals
        })
    }
})


// Get single product details
exports.getSingleDeal = catchAsyncErrors(async (req, res, next) => {

    if (req.user != null) {
        const deal = await Deal.findById(req.params.id);
        if (!deal) {
            return res.status(404).json({
                success: false,
                message: 'Deal not found'
            })
        }
        res.status(200).json({
            success: true,
            deal
        })
    }
    else {
        const deal = await Deal.findOne({ $and: [{ _id: req.params.id }, { deal_status: "active" }] })
        if (!deal) {
            return res.status(404).json({
                success: false,
                message: 'Deal not found'
            })
        }
        res.status(200).json({
            success: true,
            deal
        })
    }
})

//Update Deal -- For Admins
exports.updateDeal = catchAsyncErrors(async (req, res, next) => {

    let deal = await Deal.findById(req.params.id);

    if (!deal) {
        return res.status(404).json({
            success: false,
            message: 'Deal not found'
        })
    }

    deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        deal
    })

})


//Inactivate Product -- For Admins
exports.inactivateDeal = catchAsyncErrors(async (req, res, next) => {

    const deal = await Deal.findById(req.params.id);

    if (!deal) {
        return res.status(404).json({
            success: false,
            message: 'Deal not found'
        })
    }

     updatedeal = await Deal.findByIdAndUpdate(req.params.id, { deal_status: "inactive" }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        deal: updatedeal
    })

})