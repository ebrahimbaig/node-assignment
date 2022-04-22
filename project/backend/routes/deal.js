const express = require('express');
const router = express.Router();

const { getallDeals, newDeal, getSingleDeal, updateDeal, inactivateDeal} = require('../controllers/deal')
const {verifyToken, authorizeRoles} = require("../middlewares/authentication");


router.get('/deals', getallDeals)

router.get('/deal/:id', getSingleDeal)

// admin routes
router.get('/admin/deals', verifyToken, authorizeRoles("admin"), getallDeals)

router.get('/admin/deal/:id', verifyToken, authorizeRoles("admin"), getSingleDeal)

router.post("/admin/newdeal", verifyToken, authorizeRoles("admin"), newDeal)

router.put("/admin/deal/:id", verifyToken, authorizeRoles("admin"), updateDeal)

router.put("/admin/inactivate/deal/:id", verifyToken, authorizeRoles("admin"), inactivateDeal)


module.exports = router;