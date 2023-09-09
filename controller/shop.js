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

module.exports = {
    addProduct,
}