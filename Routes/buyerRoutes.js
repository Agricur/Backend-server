const {Router}  = require('express');
const buyerController = require('../controller/buyer');

const router = Router();

// Define routes related to user operations
router.post('/', buyerController.createUser);
// router.get('/', UserController.getAllUsers);
// router.post('/r', UserController.insertUserAddress); 
// router.get('/profile/:id', UserController.getUserProfile); 

module.exports = router;
 