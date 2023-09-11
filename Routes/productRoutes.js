const {Router}  = require('express');
const productController = require('../controller/products');

const router = Router();

router.get('/getAllProducts', productController.getAllProducts);
router.get('/getFruits', productController.getFruits);
router.get('/getVegetables', productController.getVegetables);
router.get('/getGrains', productController.getGrains);
router.get('/getFertilizers', productController.getFertilizers);
router.get('/getEquipments', productController.getEquipments);

 
module.exports = router; 