const pool = require('../db/db');

const Fruits = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Fruits'";
const Vegetables = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Vegetables'";
const Grains = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Grains'";
const Fertilizers = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Fertilizers'";
const Equipments = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product WHERE category = 'Equipment'";
const getProducts = "SELECT product_id,shop_id,name,category,price,price_unit,image,rating FROM public.product";
const getOneProduct = "SELECT product_id,shop_id,name,category,price,quantity,price_unit,quantity_unit,image,image2,selling_quantities FROM public.product WHERE product_id = $1";
const insertRating = "INSERT INTO public.product_rating(product_id,user_id, rating) VALUES ($1, $2, $3)";
const gettingRating = "SELECT rating FROM public.product_rating WHERE product_id = $1 and user_id = $2";
const updatingRatings = "UPDATE public.product_rating SET rating = $1 WHERE product_id = $2 and user_id = $3";
const getRatingbyProduct = "SELECT rating FROM public.product_rating WHERE product_id = $1";
const updateProductRating = "UPDATE public.product SET rating = $1 WHERE product_id = $2";
const getProductRating = "SELECT rating FROM public.product WHERE product_id = $1";

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

  const getProduct = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(getOneProduct,[id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
        }
      });
    });
  }

  // add rating to product_rating table
  const addRating = (product_id, rating, user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(insertRating,[product_id, user_id, rating], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve("Rating added");
        }
      });
    });
  }

  // get rating from product_rating table 
  const getRating = (product_id, user_id) => { 
    return new Promise((resolve, reject) => {
      pool.query(gettingRating,[product_id, user_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
  }

  // update rating in product_rating table
  const updateRatings = (rating, product_id, user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(updatingRatings,[rating, product_id, user_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve("Rating updated");
        }
      });
    });
  }

  // get rating from product_rating table by product_id
  const getRatings = (product_id) => {
    return new Promise((resolve, reject) => {
      pool.query(getRatingbyProduct,[product_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
  }

  // update rating in product table
  const updateProductRatings = (rating, product_id) => {
    return new Promise((resolve, reject) => {
      pool.query(updateProductRating,[rating, product_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve("Rating updated");
        }
      });
    });
  }

  const getProductRatings = (product_id) => {
    return new Promise((resolve, reject) => {
      pool.query(getProductRating,[product_id], (error, results) => {
        if (error) {
          reject(error);
        } else {  
          resolve(results.rows[0]);
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
    getProduct,
    addRating,
    getRating,
    updateRatings,
    getRatings,
    updateProductRatings,
    getProductRatings,
}