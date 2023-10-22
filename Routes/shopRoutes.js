const {Router}  = require('express');
const shopController = require('../controller/shop');
const { upload } = require('../multer');


const router = Router();

router.post('/addProduct', upload.single('image'), shopController.addProduct);
router.get('/getProducts/:userID', shopController.getProducts);
router.get('/data/:userID', shopController.getData);
router.get('/getAllShops', shopController.getAllShops);
router.get('/getShopDetails/:shopID', shopController.getShopDetails);
router.get('/getShopInfo/:userID', shopController.getShopInfo);
router.put('/edit-name/:shopID', shopController.editName);
router.put('/edit-address/:shopID', shopController.editAddress);
router.put('/edit-photo/:shopID', upload.single('shopImage'), shopController.editPhoto);
router.put('/edit-description/:shopID', shopController.editDescription);
module.exports = router;