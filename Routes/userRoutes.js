const {Router}  = require('express');
const userController = require('../controller/user');
const { upload } = require('../multer');

const router = Router();

// Define routes related to user operations
router.post('/user-login', userController.loginUser);  
router.get('/data', userController.getData);
router.put('/edit-name/:userID', userController.editName);
router.put('/edit-address/:userID', userController.editAddress);
router.put('/edit-photo/:userID', upload.single('profilePhoto'), userController.editPhoto);
router.get('/userData/:userID', userController.getUserdata);
router.get('/getInfo/:userID', userController.getUserInfo);  
module.exports = router;