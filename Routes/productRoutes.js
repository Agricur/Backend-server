const {Router}  = require('express');
const productController = require('../controller/products');

const router = Router();

router.get('/getAllProducts', productController.getAllProducts);
router.get('/getFruits', productController.getFruits);
router.get('/getVegetables', productController.getVegetables);
router.get('/getGrains', productController.getGrains);
router.get('/getFertilizers', productController.getFertilizers);
router.get('/getEquipments', productController.getEquipments);
router.get('/getProduct/:id', productController.getProduct);
router.get('/getRating/:productId', productController.getRating)
router.post('/addRating/:productId', productController.addRating);

 
module.exports = router; 