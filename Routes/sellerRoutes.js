const {Router}  = require('express');
const sellerController = require('../controller/seller');

const router = Router();

// Define routes related to user operations
router.post('/seller-register', sellerController.createSeller);
router.get('/sellerData/:userID', sellerController.getSellerData);
router.get('/getCourier/:shopID', sellerController.getCourier);
router.get('/getCourierPrice/:district',sellerController.getCourierPrice);

module.exports = router;
