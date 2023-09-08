const {Router}  = require('express');
const userController = require('../controller/user');

const router = Router();

// Define routes related to user operations
router.post('/user-login', userController.loginUser);
router.get('/data', userController.getData)

module.exports = router;
 