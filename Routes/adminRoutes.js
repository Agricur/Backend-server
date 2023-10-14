const {Router}  = require('express');
const adminController = require('../controller/admin');

const router = Router();

router.post('/admin-register', adminController.createAdmin);
router.post('/admin-login', adminController.loginAdmin);
router.get('/data', adminController.getData)

module.exports = router; 