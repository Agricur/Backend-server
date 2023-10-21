const { get } = require('../app');
const pool = require('../db/db');

const insertProduct = "INSERT INTO public.product(Shop_id,name,price,quantity,category,price_unit,quantity_unit,image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
const getShopID = "SELECT shop_id FROM public.shop WHERE user_id = $1";
const getAllProducts = "SELECT * FROM public.product WHERE shop_id = $1";
const getShopdata = "SELECT shop_name,image FROM public.shop WHERE shop_id = $1";
const getAllshops = "SELECT shop_id,shop_name,image FROM public.shop";
const getAddress = "SELECT number,street,city,district FROM public.shop_address WHERE shop_id = $1";

const addProduct = (shop_id,name,price,quantity,category,priceUnit,quantityUnit,file_URL) =>{
    return new Promise((resolve,reject)=>{
        pool.query(insertProduct,[shop_id,name,price,quantity,category,priceUnit,quantityUnit,file_URL],(error,results)=>{
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
module.exports = {
    addProduct,
    getShopId,
    getProducts,
    getShopData,
    getAllShops,
    getShopAddress
}