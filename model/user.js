const pool = require('../db/db');

// const checkMail = "SELECT * FROM public.user WHERE email = $1";
const getMail = "SELECT email FROM public.user WHERE email = $1";   
const getPassword = "SELECT password FROM public.user WHERE email = $1";
const bcrypt = require('bcrypt');

const checkPassword = (password, email) => {
    return new Promise((resolve, reject) => {
        pool.query(getPassword, [email], (error, results) => {
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
      pool.query(getMail, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows.length > 0);
        }
      });
    });
  };

module.exports = {
    checkMail,
    checkPassword,
}