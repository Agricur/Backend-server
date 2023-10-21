const Shop = require('../model/shop');
const path = require('path');
const {upload} = require('../multer');


const addProduct = async (req, res) => {
    const {name,price,quantity,category,priceUnit,quantityUnit,user_id} = req.body;
    
    const file_name = req.file.filename;
    const file_URL = path.join(file_name)

    const shop_id = await Shop.getShopId(user_id);
 
    try{

        const message = await Shop.addProduct(shop_id,name,price,quantity,category,priceUnit,quantityUnit,file_URL);
        res.status(201).json({ message: message });
    }catch(err){
        res.status(400).json({ message: err });
    }

}; 

const getProducts = async (req, res) => {
    const user_id = req.params.userID;
    // console.log(user_id);
    const shop_id = await Shop.getShopId(user_id);
    // console.log(shop_id); 
    try{
        const products = await Shop.getProducts(shop_id);
        // console.log(products);
        res.status(200).json({ products: products }); 
    }catch(err){
        res.status(400).json({ message: err }); 
    }
}

const getData = async (req, res) => {
    const user_id = req.params.userID;
    const shop_id = await Shop.getShopId(user_id);
    try{
        const shop = await Shop.getShopData(shop_id);
        res.status(200).json({ shop: shop }); 
    }catch(err){
        res.status(400).json({ message: err });  
    }
}

const getAllShops = async (req, res) => {
    try{
        const shops = await Shop.getAllShops();
        res.status(200).json({ shops: shops }); 
    }catch(err){
        res.status(400).json({ message: err });  
    }
}

const getShopDetails = async (req, res) => {
    const shop_id = req.params.shopID;
    try{
        const shop = await Shop.getShopData(shop_id);
        const products = await Shop.getProducts(shop_id);
        shop.products = products;
        res.status(200).json({ shop: shop }); 
    }catch(err){
        res.status(400).json({ message: err });  
    }
}

module.exports = {
    addProduct,
    getProducts,
    getData,
    getAllShops,
    getShopDetails,
}