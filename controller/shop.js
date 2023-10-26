const Shop = require('../model/shop');
const User = require('../model/user');
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

const getShopInfo = async (req, res) => {
    const user_id = req.params.userID;
    const shop_id = await Shop.getShopId(user_id);
    try{
        const shop = await Shop.getShopData(shop_id);
        const seller = await User.getUserData(user_id);
        res.status(200).json({ 
            shop_name: shop.shop_name,
            shop_image: shop.image,
            seller_name: seller.first_name,
            seller_email: seller.email,
            shop_id: shop_id,
        }); 
    }catch(err){
        res.status(400).json({ message: err });  
    }
}

const editName = async (req, res) => {
    const shop_id = req.params.shopID;
    const {shopName} = req.body;
    await Shop.updateName(shopName,shop_id);
    res.status(201).json({ message: "Successfully updated the Name." });
}

const editAddress = async (req, res) => {
    const shop_id = req.params.shopID;
    const {shopNo,street,city,district} = req.body;
    await Shop.updateAddress(shopNo,street,city,district,shop_id);
    res.status(201).json({ message: "Successfully updated the Address." });
}

const editPhoto = async (req, res) => {
    const shop_id = req.params.shopID;
    const file_name = req.file.filename;    
    const file_URL = path.join(file_name)
    await Shop.updatePhoto(file_URL,shop_id);
    res.status(201).json({ message: "Successfully updated the Photo." });
}

const editDescription = async (req, res) => {
    const shop_id = req.params.shopID;
    const {shopDescription} = req.body;
    console.log(shopDescription)
    await Shop.updateDescription(shopDescription,shop_id);
    res.status(201).json({ message: "Successfully updated the Description." });
}

module.exports = {
    addProduct,
    getProducts,
    getData,
    getAllShops,
    getShopDetails,
    getShopInfo,
    editName,
    editAddress,
    editPhoto,
    editDescription
}