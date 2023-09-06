const pool = require("../db/db");
const User = require("../model/user");

const loginUser = async (req, res) => {
    const {email,password} = req.body;
    const emailExists = await User.checkMail(email);
    console.log(emailExists)
    if(!emailExists){
        res.status(400).json({ message: "Account doesn't exists!" });
    }else{
        const passwordExists = await User.checkPassword(password,email);
        // console.log(passwordExists)
        if(passwordExists){
            res.status(201).json({ message: "Successfully logged in!" });
        }else{
            res.status(400).json({ message: "Username or Password is incorrect!" });
        } 
    }
};

module.exports = {
    loginUser,
}