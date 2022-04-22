const express = require('express');
const router = express.Router();


const { getallProducts, newProduct, getSingleProduct, updateProduct, inactivateProduct} = require('../controllers/product')
const {verifyToken, authorizeRoles} = require("../middlewares/authentication");


router.get('/products', getallProducts)

router.get('/product/:id', getSingleProduct)

// admin routes
router.get('/admin/products', verifyToken, authorizeRoles("admin"), getallProducts)

router.get('/admin/product/:id', verifyToken, authorizeRoles("admin"), getSingleProduct)

router.post("/admin/newproduct", verifyToken, authorizeRoles("admin"), newProduct)

router.put("/admin/product/:id", verifyToken, authorizeRoles("admin"), updateProduct)

router.put("/admin/inactivate/product/:id", verifyToken, authorizeRoles("admin"), inactivateProduct)


module.exports = router;