const {Router}  = require('express');
const shopController = require('../controller/shop');
const { upload } = require('../multer');


const router = Router();

router.post('/addProduct', upload.single('image'), shopController.addProduct);

module.exports = router;