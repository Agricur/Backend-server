const pool = require('../db/db');

const getUSerByMail = "SELECT * FROM public.user WHERE email = $1";
const getUserByID = "SELECT * FROM public.user WHERE user_id = $1";
const getShopName = "SELECT shop_name FROM public.shop WHERE shop_id = $1"
const getAddressByID = "SELECT * FROM public.user_address WHERE user_id = $1";
const updateNameByID = "UPDATE public.user SET first_name = $1 WHERE user_id = $2";
const updateAddressByID = "UPDATE public.user_address SET number = $1, street = $2, city = $3, district = $4 WHERE user_id = $5";
const updatePhotoByID = "UPDATE public.user SET profile_photo = $1 WHERE user_id = $2";
const getPhoneNo = "SELECT contact_no FROM public.user WHERE user_id = $1";
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
        last_name = results.rows[0].last_name;
        email = results.rows[0].email;
        profile_photo = results.rows[0].profile_photo;
        resolve({first_name,last_name, email, profile_photo});
};
    });
  }); 
}
 



const getUserFullData = (user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(getUserByID, [user_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        pool.query(getAddressByID, [user_id], (error, addressResults) => {
        first_name = results.rows[0].first_name;
        email = results.rows[0].email;
        profile_photo = results.rows[0].profile_photo;
        contact_no = results.rows[0].contact_no;
        home_no = addressResults.rows[0].number;
        street = addressResults.rows[0].street;
        city = addressResults.rows[0].city;
        district = addressResults.rows[0].district;
        resolve({first_name, email, profile_photo, contact_no, home_no, street, city, district});
        // resolve({first_name, email, profile_photo});
      })};
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

const updateName = (buyerName,user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(updateNameByID, [buyerName,user_id], (error, results) => {
      if (error) {
        throw (error);
      } else {
        resolve(results.rows);
      }
    });
  });
}

const updateAddress = (homeNo, street, city, district, user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(updateAddressByID, [homeNo, street, city, district, user_id], (error, results) => {
      if (error) {
        throw (error);
      } else {
        resolve(results.rows);
      }
    });
  });
}

const updatePhoto = (file_URL, user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(updatePhotoByID, [file_URL, user_id], (error, results) => {
      if (error) {
        throw (error);
      } else {
        resolve(results.rows);
      }
    });
  });
}

const getContactNo = (user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(getPhoneNo, [user_id], (error, results) => {
      if (error) {
        throw (error);
      } else {
        resolve(results.rows[0].contact_no);
      }
    });
  });
}

module.exports = {
    checkMail,
    checkPassword,
    getUser,
    getUserData,
    getShopNames,
    updateName,
    updateAddress,
    updatePhoto,
    getContactNo,
    getUserFullData,
}