const {Router}  = require('express');
const cartController = require('../controller/cart');

const router = Router();

router.post('/createCart', cartController.createCart);
router.post('/insertProduct', cartController.insertProduct);
router.get('/getCart', cartController.getCart); 
router.post('/updateCartItems',cartController.updateCart)
router.post('/removeItems', cartController.removeItems)

module.exports = router;  