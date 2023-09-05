const {Router}  = require('express');
const UserController = require('../controller/user');

const router = Router();

// Define routes related to user operations
router.post('/', UserController.createUser); 
// router.get('/profile/:id', UserController.getUserProfile); 

module.exports = router;
 