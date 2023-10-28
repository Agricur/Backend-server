const {Router}  = require('express');
const cartController = require('../controller/cart');

const router = Router();

router.post('/createCart', cartController.createCart);
router.post('/insertProduct', cartController.insertProduct);
router.get('/getCart', cartController.getCart); 
router.post('/updateCartItems',cartController.updateCart)
router.post('/updateCart', cartController.updateCartWeight);
router.post('/removeItems', cartController.removeItems)
router.get('/getCartMobile/:userID', cartController.getCartMobile)
router.post('/updateCartMobile/:userID', cartController.updateCartMobile)
router.post('/removeItemsMobile/:userID', cartController.removeItemsMobile)

module.exports = router;  