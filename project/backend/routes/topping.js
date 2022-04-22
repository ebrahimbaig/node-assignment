const express = require('express');
const router = express.Router();


const { getallToppings, newTopping, getSingleTopping, updateTopping, inactivateTopping} = require('../controllers/topping')
const {verifyToken, authorizeRoles} = require("../middlewares/authentication");


router.get('/toppings', getallToppings)

// admin routes
router.get('/admin/toppings', verifyToken, authorizeRoles("admin"), getallToppings)

router.get('/admin/topping/:id', verifyToken, authorizeRoles("admin"), getSingleTopping)

router.post("/admin/newtopping", verifyToken, authorizeRoles("admin"), newTopping)

router.put("/admin/topping/:id", verifyToken, authorizeRoles("admin"), updateTopping)

router.put("/admin/inactivate/topping/:id", verifyToken, authorizeRoles("admin"), inactivateTopping)


module.exports = router;