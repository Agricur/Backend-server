const pool = require('../db/db');

const getUSerByMail = "SELECT * FROM public.user WHERE email = $1";
const getUserByID = "SELECT * FROM public.user WHERE user_id = $1";
const getProducts = "SELECT product_id,shop_id,name,price,price_unit,image FROM public.product";
const getShopName = "SELECT shop_name FROM public.shop WHERE shop_id = $1"
const bcrypt = require('bcrypt');

const getUser = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(getUSerByMail, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        user_id = results.rows[0].user_id;
        is_seller = results.rows[0].is_seller;
        resolve({user_id, is_seller});
      }
    });
  });
} 

const getUserData = (user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(getUserByID, [user_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        first_name = results.rows[0].first_name;
        resolve({first_name});
      }
    });
  });
}

const checkPassword = (password, email) => {
    return new Promise((resolve, reject) => {
        pool.query(getUSerByMail, [email], (error, results) => {
        if (error) {
            throw error;
        } else {
            const hash = results.rows[0].password;
            bcrypt.compare(password, hash, (err, resp) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            });
        }
    });
    });
    
};

const checkMail = (email) => {
    return new Promise((resolve, reject) => {
      pool.query(getUSerByMail, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows.length > 0);
        }
      });
    });
  };

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

  const getShopNames = (shop_id) =>{
    return new Promise((resolve,reject)=>{
      pool.query(getShopName,[shop_id],(error,results)=>{
        if(error){
          throw error;
        }else{
          resolve(results.rows[0].shop_name)
        }
      })
    })
  }

module.exports = {
    checkMail,
    checkPassword,
    getUser,
    getUserData,
    getAllProducts,
    getShopNames,
}