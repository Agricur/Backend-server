const pool = require("../db/db");
const User = require("../model/user");
 
const createUser = async (req, res) => {
    // const { ip_address, first_name, last_name, contact_no, email, password } = req.body;
  const ip_address = req.ip;
  const { first_name, last_name, contact_no, email, password,rePassword,number,street,city,district } = req.body;
  pool.query(User.checkMail, [email], (error, results) => {
    if (results.rows.length) {
        res.status(400).json({ message: 'Email already exists' });
    } else {
      pool.query(User.createUser, [ip_address, first_name, last_name, contact_no, email, password],(error, results) => {
          if (error) {
            throw error;
          } else {
            res.status(201).json("user craeted successfully");
          }
        }
      );
    }
  });
};

module.exports = {
  createUser,
};
