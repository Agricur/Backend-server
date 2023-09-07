const pool = require("../db/db");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const {email,password} = req.body;
    const emailExists = await User.checkMail(email);
    if(!emailExists){
        res.status(400).json({ message: "Account doesn't exists!" });
    }else{
        const passwordExists = await User.checkPassword(password,email);
        if(passwordExists){
            const u_id = await User.getUserID(email); 
            const token = jwt.sign({ u_id }, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_TIME,
            }); 
            
            res.status(201).json({ message: "Successfully logged in!",token: token });
        }else{
            res.status(400).json({ message: "Username or Password is incorrect!" });
        } 
    }
};

module.exports = {
    loginUser,
}