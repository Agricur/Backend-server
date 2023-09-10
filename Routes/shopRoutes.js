const {Router}  = require('express');
const shopController = require('../controller/shop');
const { upload } = require('../multer');


const router = Router();

router.post('/addProduct', upload.single('image'), shopController.addProduct);
router.get('/getProducts/:userID', shopController.getProducts);
module.exports = router;