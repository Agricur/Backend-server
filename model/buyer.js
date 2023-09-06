const pool = require('../db/db');
const bcrypt = require('bcrypt');

const getMail = "SELECT email FROM public.user WHERE email = $1";
const insertUser = "INSERT INTO public.user(ip_address,first_name,last_name,contact_no,email,password) VALUES ($1,$2,$3,$4,$5,$6)";
const insertUserAdress = "INSERT INTO public.user_address(user_id,number,street,city,district) VALUES ($1,$2,$3,$4,$5)";
const getUserID = "SELECT user_id FROM public.user WHERE email = $1";

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

const createUser = (ip_address, first_name, last_name, contact_no, email, password,number,street,city,district) =>{
    return new Promise((resolve,reject)=>{
        hashPassword(password).then((hashedPassword)=> {
        pool.query(insertUser, [ip_address, first_name, last_name, contact_no, email, hashedPassword],(error, results) => {
            if (error) {
                throw error;
            } else {
                pool.query(getUserID,[email],(error,id)=>{
                    if(error){
                        throw error;
                    }else{
                        const UserID = parseInt(id.rows[0].user_id); 
                        pool.query(insertUserAdress,[UserID,number,street,city,district],(error,results)=>{
                            if(error){
                                throw error;
                            }else{
                                resolve("Buyer account created successfully")
                            }
                        })
                    }
                })
            }
        });
    })
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
    createUser,
}