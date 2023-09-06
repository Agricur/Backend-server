const pool = require('../db/db');
const bcrypt = require('bcrypt');

const getMail = "SELECT email FROM public.user WHERE email = $1";
const insertShop = "INSERT INTO public.shop(shop_name,user_id) VALUES ($1,$2)";  
const insertUser = "INSERT INTO public.user(ip_address,first_name,last_name,contact_no,is_seller,email,password) VALUES ($1,$2,$3,$4,$5,$6,$7)";
const insertShopAdress = "INSERT INTO public.shop_address(shop_id,number,street,city,district) VALUES ($1,$2,$3,$4,$5)";
const getUserID = "SELECT user_id FROM public.user WHERE email = $1";
const getShopID = "SELECT shop_id FROM public.shop WHERE user_id = $1";

const checkMail = (email) => {
    return new Promise((resolve, reject) => {
      pool.query(getMail, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows.length > 0);
        }
      });
    });
  };

const createUser = (ip_address, first_name, last_name,shop_name,contact_no, email, password,number,street,city,district) =>{
    return new Promise((resolve,reject)=>{
        hashPassword(password).then((hashedPassword)=> {
        const is_seller = true;
        pool.query(insertUser, [ip_address, first_name, last_name, contact_no, is_seller, email, hashedPassword],(error, results) => {
            if (error) {
                throw error;
            } else {
                pool.query(getUserID,[email],(error,id)=>{
                    if(error){
                        throw error;
                    }else{
                        const UserID = parseInt(id.rows[0].user_id); 
                        pool.query(insertShop,[shop_name,UserID],(error,result)=>{
                            if(error){
                                throw error;
                            }else{
                                pool.query(getShopID,[UserID],(error,sID)=>{
                                    if(error){
                                        throw error;
                                    }else{
                                        const ShopID = parseInt(sID.rows[0].shop_id); 
                                        pool.query(insertShopAdress,[ShopID,number,street,city,district],(error,results)=>{
                                            if(error){
                                                throw error;
                                            }else{
                                                resolve("Seller account created successfully")
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    })
    })
    
    
}

const createShop =(shop_name,user_id) =>{
    pool.query(insertShop,[shop_name,user_id],(error,result)=>{
        if(error){
            throw error;
        }else{
            const message = "Shop successfully created"
            return message;
        }
    })
}

const insertAddress=(shop_id,number,street,city,district) => {
    pool.query(insertShopAdress,[shop_id,number,street,city,district],(error,results)=>{
        if(error){
            throw error;
        }else{
            const message = "Address successfully inserted"
            return message;
        }
    })
}

const hashPassword = async (password) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        throw err;
    }
}
module.exports = {
    checkMail,  
    createShop,
    createUser,
    insertAddress,
}