const pool = require('../db/db');

const Fruits = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Fruits'";
const Vegetables = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Vegetables'";
const Grains = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Grains'";
const Fertilizers = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Fertilizers'";
const Equipments = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Equipment'";
const getProducts = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product";

const getFruits = () => {
    return new Promise((resolve, reject) => {
      pool.query(Fruits, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
}

const getVegetables = () => {
    return new Promise((resolve, reject) => {
      pool.query(Vegetables, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
}

const getGrains = () => {
    return new Promise((resolve, reject) => {
      pool.query(Grains, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
}

const getFertilizers = () => {
    return new Promise((resolve, reject) => {
      pool.query(Fertilizers, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
}

const getEquipments = () => {
    return new Promise((resolve, reject) => {
      pool.query(Equipments, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
}

const getAllProducts=() =>{
    return new Promise((resolve,reject)=>{
      pool.query(getProducts, (error, results) => {
      if (error) {
        throw error;
      }else{
        resolve(results.rows)
      }
      
    });
    });
    
  }

module.exports = {
    getFruits,
    getVegetables,
    getGrains,
    getFertilizers,
    getEquipments,  
    getAllProducts,  
}