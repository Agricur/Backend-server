const Product = require('../model/products');
const User = require('../model/user');

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.getAllProducts();
        for(const item of products){
            const shop_id = item.shop_id;
            const shop_name = await User.getShopNames(shop_id);
            item.shop_name = shop_name;
        }
        res.status(200).json({ products: products }); 
    }catch(err){
        res.status(400).json({ message: err }); 
    }
}

const getFruits = async (req, res) => {
    try{
        const products = await Product.getFruits();
        for(const item of products){
            const shop_id = item.shop_id;
            const shop_name = await User.getShopNames(shop_id);
            item.shop_name = shop_name;
        }
        res.status(200).json({ products: products }); 
    }catch(err){
        res.status(400).json({ message: err }); 
    }
};

const getVegetables = async (req, res) => {
    try{
        const products = await Product.getVegetables();
        for(const item of products){
            const shop_id = item.shop_id;
            const shop_name = await User.getShopNames(shop_id);
            item.shop_name = shop_name;
        }
        res.status(200).json({ products: products }); 
    }catch(err){
        res.status(400).json({ message: err }); 
    }
};

const getGrains = async (req, res) => {
    try{
        const products = await Product.getGrains();
        for(const item of products){
            const shop_id = item.shop_id;
            const shop_name = await User.getShopNames(shop_id);
            item.shop_name = shop_name;
        }
        res.status(200).json({ products: products }); 
    }catch(err){
        res.status(400).json({ message: err }); 
    }
};

const getFertilizers = async (req, res) => {
    try{
        const products = await Product.getFertilizers();
        for(const item of products){
            const shop_id = item.shop_id;
            const shop_name = await User.getShopNames(shop_id);
            item.shop_name = shop_name;
        }
        res.status(200).json({ products: products }); 
    }catch(err){
        res.status(400).json({ message: err }); 
    }
};

const getEquipments = async (req, res) => {
    try{
        const products = await Product.getEquipments();
        for(const item of products){
            const shop_id = item.shop_id;
            const shop_name = await User.getShopNames(shop_id);
            item.shop_name = shop_name;
        }
        res.status(200).json({ products: products }); 
    }catch(err){
        res.status(400).json({ message: err }); 
    }
};



module.exports = {
    getAllProducts,
    getFruits,
    getVegetables,
    getGrains,
    getFertilizers,
    getEquipments,

}