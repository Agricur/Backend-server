const User = require("../model/buyer");


const createBuyer = async (req, res) => {

  const ip_address = req.ip;
  const { first_name, last_name, contact_no, email, password,number,street,city,district} = req.body;
  const emailExists = await User.checkMail(email);

  if (emailExists) {
    res.status(400).json({ message: 'Email already exists' });  
  } else {
    const message = await User.createUser(ip_address,first_name,last_name,contact_no,email,password,number,street,city,district);
    res.status(201).json(message);
  } 
}

module.exports = {
  createBuyer,
};
