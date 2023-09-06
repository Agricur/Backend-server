const {Router}  = require('express');
const sellerController = require('../controller/seller');

const router = Router();

// Define routes related to user operations
router.post('/seller-register', sellerController.createSeller);

module.exports = router;
 