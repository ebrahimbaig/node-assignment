const Product = require('../models/product')
const User = require("../models/user")
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')


//Add new product -- For Admins
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.createdBy = req.user._id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// Get all products 
exports.getallProducts = catchAsyncErrors(async (req, res, next) => {

    if (req.user != null) {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    }
    else {
        //const products = await Product.find({ product_status: "active" });
        //const resPerPage = 6;
        const productsCount = await Product.countDocuments();
    
        const apiFeatures = new APIFeatures(Product.find({ product_status: "active" }), req.query)
            .search()
    
        let products = await apiFeatures.query;
    
        //apiFeatures.pagination(resPerPage)
        products = await apiFeatures.query;
    
        res.status(200).json({
            success: true,
            count: productsCount,
            //resPerPage,
            products
        })
        // res.status(200).json({
        //     success: true,
        //     count: products.length,
        //     products
        // })
        // setTimeout(() => {
        //     res.status(200).json({
        //         success: true,
        //         count: products.length,
        //         products
        //     })  
        // }, 2000);
    }
})


// Get single product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    if (req.user != null) {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            product
        })
    }
    else {
        const product = await Product.findOne({ $and: [{ _id: req.params.id }, { product_status: "active" }] })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            product
        })
    }
})

//Update Product -- For Admins
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})


//Inactivate Product -- For Admins
exports.inactivateProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    const prod = await Product.findByIdAndUpdate(req.params.id, { product_status: "inactive" }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product: prod
    })

})