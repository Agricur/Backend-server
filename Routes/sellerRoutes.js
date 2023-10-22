const {Router}  = require('express');
const sellerController = require('../controller/seller');

const router = Router();

// Define routes related to user operations
router.post('/seller-register', sellerController.createSeller);
router.get('/sellerData/:userID', sellerController.getSellerData);

module.exports = router;
