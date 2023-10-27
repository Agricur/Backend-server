const pool = require('../db/db');

const createCart = "INSERT INTO public.cart (user_id) VALUES ($1)";
const InsertProduct = "INSERT INTO public.cart_items_details (cart_id,product_id,quantity,price,image,quantity_unit) VALUES ($1,$2,$3,$4,$5,$6)";
const getCartid = "SELECT cart_id FROM public.cart WHERE user_id = $1";
const deleteAProduct = "DELETE FROM public.cart_items_details WHERE cart_id = $1 AND product_id = $2";
const getCartitems = "SELECT * FROM public.cart_items_details WHERE cart_id = $1 ORDER BY product_id";
const updatequantity = "UPDATE public.cart_items_details SET quantity = $1 WHERE cart_id = $2 AND product_id = $3";
const updatequantityAndPrice = "UPDATE public.cart_items_details SET quantity = $1, price = $2 WHERE cart_id = $3 AND product_id = $4";

const createACart = (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(createCart, [user_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });   
}

const insertProduct = (cart_id,product_id,quantity,price,image,quantity_unit) => {
    return new Promise((resolve, reject) => {
      pool.query(InsertProduct, [cart_id,product_id,quantity,price,image,quantity_unit], (error, results) => {
        if (error) {
          reject(error);
        } else { 
          resolve(results.rows);
        }
      }); 
    });
}

const getCartItems = (cart_id) => {
    return new Promise((resolve, reject) => {
      pool.query(getCartitems, [cart_id], (error, results) => {
        if (error) {
          reject(error);    
        } else {
          resolve(results.rows.length > 0 ? results.rows : false);
        }
      });
    });
}
 
const getCartId = (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(getCartid, [user_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows.length > 0 ? results.rows[0].cart_id : false);
        }
      });
    }); 
}

const deleteProduct = (cart_id,product_id) => { 
    return new Promise((resolve, reject) => { 
        pool.query(deleteAProduct, [cart_id,product_id], (error, results) => {
            if (error) {  
                reject(error);
            } else {  
                resolve(results.rows);
            } 
        }); 
    }); 
} 

const updateQuantity = (quantity,cart_id,product_id) => {
    return new Promise((resolve, reject) => { 
        pool.query(updatequantity, [quantity,cart_id,product_id], (error, results) => {
            if (error) { 
                reject(error);
            } else { 
                resolve(results.rows);
            }
        });
    });
}

const updateQuantitiyAndPrice = (quantity,price,cart_id,product_id) => {
    return new Promise((resolve, reject) => { 
        pool.query(updatequantityAndPrice, [quantity,price,cart_id,product_id], (error, results) => {
            if (error) { 
                reject(error);
            } else { 
                resolve("Updated Successfully");
            }
        });
    });
}
 
module.exports = {
    createACart,
    insertProduct,    
    getCartId,
    deleteProduct,
    getCartItems,  
    updateQuantity,
    updateQuantitiyAndPrice,
}