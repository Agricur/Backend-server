const {Router}  = require('express');
const adminController = require('../controller/admin');
const { upload } = require('../multer');


const router = Router();

router.post('/admin-register', adminController.createAdmin);
router.post('/admin-login', adminController.loginAdmin);
router.get('/data', adminController.getData)
router.put('/updateAdminName/:adminId', adminController.updateAdminName)
router.put('/updateAdminContact/:adminId', adminController.updateAdminContact)
router.put('/updateAdminProfilePhoto/:adminId', upload.single('image'), adminController.updateAdminProfilePhoto)
router.put('/updateAdminPassword/:adminId', adminController.updateAdminPassword)

module.exports = router; 