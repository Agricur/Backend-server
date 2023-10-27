const { get } = require('../app');
const pool = require('../db/db');

const insertProduct = "INSERT INTO public.product(Shop_id,name,price,quantity,category,price_unit,quantity_unit,image,selling_quantities) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
const getShopID = "SELECT shop_id FROM public.shop WHERE user_id = $1";
const getAllProducts = "SELECT * FROM public.product WHERE shop_id = $1";
const getShopdata = "SELECT * FROM public.shop WHERE shop_id = $1";
const getAllshops = "SELECT shop_id,shop_name,image FROM public.shop";
const getAddress = "SELECT number,street,city,district FROM public.shop_address WHERE shop_id = $1";
const updateNameByID = "UPDATE public.shop SET shop_name = $1 WHERE shop_id = $2";
const updateAddressByID = "UPDATE public.shop_address SET number = $1, street = $2, city = $3, district = $4 WHERE shop_id = $5";
const updatePhotoByID = "UPDATE public.shop SET image = $1 WHERE shop_id = $2";
const updateDescriptionByID = "UPDATE public.shop SET description = $1 WHERE shop_id = $2";
const getCourierByID = "SELECT courier_id FROM public.shop WHERE shop_id = $1";
const getCourierPriceByDistrict = "SELECT price FROM public.courier WHERE district = $1";
const getCourierNameById = "SELECT courier_service FROM public.courier WHERE courier_id = $1";

const addProduct = (shop_id,name,price,quantity,category,priceUnit,quantityUnit,file_URL,sellingQuantities) =>{
    return new Promise((resolve,reject)=>{
        pool.query(insertProduct,[shop_id,name,price,quantity,category,priceUnit,quantityUnit,file_URL,sellingQuantities],(error,results)=>{
            if(error){
                throw error;
            }else{
                resolve("Product added successfully"); 
            } 
        })
    })
}

const getShopId = (user_id) =>{
    return new Promise((resolve,reject)=>{
        pool.query(getShopID,[user_id],(error,results)=>{
            if(error){
                throw error;
            }else{
                const shop_id = parseInt(results.rows[0].shop_id);
                resolve(shop_id);
            }
        })
    })
}

const getProducts = (shop_id) =>{
    return new Promise((resolve,reject)=>{
        pool.query(getAllProducts,[shop_id],(error,results)=>{
            if(error){
                throw error;
            }else{
                resolve(results.rows);
            }
        })
    })
}

const getShopData = (shop_id) =>{
    return new Promise((resolve,reject)=>{  
        pool.query(getShopdata,[shop_id],(error,results)=>{
            if(error){
                throw error;
            }else{
                console.log(results.rows[0]);
                resolve(results.rows[0]);
            }
        })
    })
}

const getAllShops = () =>{
    return new Promise((resolve,reject)=>{
        pool.query(getAllshops,(error,results)=>{
            if(error){
                throw error;
            }else{
                resolve(results.rows);
            }
        })
    })
}

const getShopAddress = (shop_id) =>{
    return new Promise((resolve,reject)=>{
        pool.query(getAddress,[shop_id],(error,results)=>{
            if(error){
                throw error;
            }else{
                resolve(results.rows[0]);
            }
        })
    })
}

const updateName = (shopName, shop_id) =>{
    return new Promise((resolve, reject) => {
        pool.query(updateNameByID, [shopName, shop_id], (error, results) => {
          if (error) {
            throw (error);
          } else {
            resolve(results.rows);
          }
        });
      });
}

const updateAddress = (shopNo, street, city, district, shop_id) =>{
    return new Promise((resolve, reject) => {
        pool.query(updateAddressByID, [shopNo, street, city, district, shop_id], (error, results) => {
          if (error) {
            throw (error);
          } else {
            resolve(results.rows);
          }
        });
      });
}

const updatePhoto = (file_URL, shop_id) => {
    return new Promise((resolve, reject) => {
      pool.query(updatePhotoByID, [file_URL, shop_id], (error, results) => {
        if (error) {
          throw (error);
        } else {
          resolve(results.rows);
        }
      });
    });
  }

const updateDescription = (shopDescription,shop_id) =>{
    return new Promise((resolve, reject) => {
        pool.query(updateDescriptionByID, [shopDescription, shop_id], (error, results) => {
          if (error) {
            throw (error);
          } else {
            resolve(results.rows);
          }
        });
      });
}

const getCourier = (shop_id) =>{
    return new Promise((resolve,reject)=>{
        pool.query(getCourierByID,[shop_id],(error,results)=>{
            if(error){
                throw error;
            }else{  
                resolve(results.rows[0]);
            }
        })
    })
}

const getCourierName = (courier_id) =>{

    return new Promise((resolve,reject)=>{
        pool.query(getCourierNameById,[courier_id],(error,results)=>{
            if(error){
                throw error;
            }else{  
             
                resolve(results.rows[0]);
            }
        })
    })
}

const getCourierPrice = (district) =>{
    return new Promise((resolve,reject)=>{
        pool.query(getCourierPriceByDistrict,[district],(error,results)=>{
            if(error){
                throw error;
            }else{  
                resolve(results.rows[0]);
            }
        })
    })
}

module.exports = {
    addProduct,
    getShopId,
    getProducts,
    getShopData,
    getAllShops,
    getShopAddress,
    updateName,
    updateAddress,
    updatePhoto,
    updateDescription,
    getCourier,
    getCourierPrice,
    getCourierName,
}