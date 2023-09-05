const pool = require("../db/db");
const User = require("../model/seller");

 
const createUser = async (req, res) => {
  const ip_address = req.ip;
  const { first_name, shop_name,last_name,contact_no, email, password} = req.body;
  pool.query(User.checkMail, [email], (error, results) => {
    if (results.rows.length) {
        res.status(400).json({ message: 'Email already exists' });
    } else {
      const is_seller = true;
      pool.query(User.createUser, [ip_address, first_name, last_name, contact_no, is_seller,email, password],(error, results) => {
          if (error) {
            throw error;
          } else {
            pool.query(User.getUserID,[email],(error,id)=>{
                if(error){
                    throw error;
                }else{
                    const {shop_name} = req.body;
                    const u_id = parseInt(id.rows[0].user_id); 
                    pool.query(User.createShop,[shop_name,u_id],(error,result)=>{
                        if(error){
                            throw error;
                        }else{
                            const {number,street,city,district} = req.body;
                            pool.query(User.getShopID,[u_id],(error,shopid)=>{
                                if(error){
                                    throw error;
                                }else{
                                    const shopID = parseInt(shopid.rows[0].shop_id);
                                    pool.query(User.insertShopAdress,[shopID,number,street,city,district],(error,results)=>{
                                        if(error){
                                            throw error;
                                        }else{
                                            res.status(201).json("Seller account craeted successfully");
                                        }
                                    })
                                }
                            });
                        }
                    });        
                }
            }); 
          }
        }
      );
    }
  });
};



// const getAllUsers = async (req, res) => {
//     pool.query(User.getAllUsers,(error,results)=>{
//         if(error){
//             throw error;
//         }else{
//             res.status(200).json(results.rows);
//         }
//     })
// }
module.exports = {
  createUser,
//   getAllUsers,
};
