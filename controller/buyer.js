const pool = require("../db/db");
const User = require("../model/buyer");

 
const createUser = async (req, res) => {
  const ip_address = req.ip;
  const { first_name, last_name, contact_no, email, password} = req.body;
  pool.query(User.checkMail, [email], (error, results) => {
    if (results.rows.length) {
        res.status(400).json({ message: 'Email already exists' });
    } else {
      pool.query(User.createUser, [ip_address, first_name, last_name, contact_no, email, password],(error, results) => {
          if (error) {
            throw error;
          } else {
            const {email,number,street,city,district} = req.body;
                pool.query(User.getUserID,[email],(error,id)=>{
                    if(error){
                        throw error;
                    }else{
                        user_id = parseInt(id.rows[0].user_id); 
                        pool.query(User.insertUserAdress,[user_id,number,street,city,district],(error,results)=>{
                          if(error){
                              throw error;
                          }else{
                              res.status(201).json("user craeted successfully");
                          }
                      })        
                  }
                })
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
  // getAllUsers,
};
