const {Router}  = require('express');
const sellerController = require('../controller/seller');

const router = Router();

// Define routes related to user operations
router.post('/', sellerController.createUser);

module.exports = router;
 