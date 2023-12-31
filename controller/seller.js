
const Seller = require("../model/seller");
const User = require("../model/user"); 
const Shop = require("../model/shop"); 
 
const createSeller = async (req, res) => {
  const ip_address = req.ip;
  const { first_name, last_name, shop_name,contact_no, email, password,number,street,city,district} = req.body;

  const emailExists = await User.checkMail(email);

  if (emailExists) {
    res.status(400).json({ message: 'Email already exists' });  
  } else {
    const message = await Seller.createUser(ip_address,first_name,last_name,shop_name,contact_no,email,password,number,street,city,district);
    res.status(201).json(message);
  } 
  
};
 
const getSellerData = async (req, res) => {

    const seller_id = req.params.userID; 
    try{
        const shop_id = await Shop.getShopId(seller_id);
        const shopAddress = await Shop.getShopAddress(shop_id);
        const phoneNo = await User.getContactNo(seller_id); 
        res.json({
          home_no: shopAddress.number,
          street: shopAddress.street,
          city: shopAddress.city,
          district: shopAddress.district,
          contact_no: phoneNo,
      });

    }catch(err){
        res.status(400).json({ message: err });  
    }
}

const getCourier = async (req, res) => {
  const shop_id = req.params.shopID;
  try{
    const courier = await Shop.getCourier(shop_id);
    const name = await Shop.getCourierName(courier.courier_id);
    res.json(name);
  }catch(err){
    res.status(400).json({ message: err });  
  }
}

const getCourierPrice = async (req, res) => {
  const district = req.params.district;
  try{
    const price = await Shop.getCourierPrice(district);
    res.json(price);
  }catch(err){
    res.status(400).json({ message: err });  
  }
}

module.exports = {
  createSeller,
  getSellerData,
  getCourier,
  getCourierPrice,
};
