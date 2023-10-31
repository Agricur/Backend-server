const {Router}  = require('express');
const buyerController = require('../controller/buyer');

const router = Router();

router.post('/buyer-register', buyerController.createBuyer);
// router.get('/', UserController.getAllUsers);
// router.post('/r', UserController.insertUserAddress); 
// router.get('/profile/:id', UserController.getUserProfile); 

module.exports = router;
 