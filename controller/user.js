const User = require("../model/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const { promisify } = require("util");

const loginUser = async (req, res) => {
    const {email,password} = req.body;
    const emailExists = await User.checkMail(email);
    if(!emailExists){
        res.status(400).json({ message: "Account doesn't exists!" });
    }else{
        const passwordExists = await User.checkPassword(password,email);
        if(passwordExists){
            const {user_id,is_seller} = await User.getUser(email); 
            const token = jwt.sign({ user_id,is_seller }, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_TIME,
            }); 
                       
            res.status(201).json({ message: "Successfully logged in!",token: token, user_id: user_id, is_seller: is_seller });
        }else{
            res.status(400).json({ message: "Username or Password is incorrect!" });
        } 
    }
};
 
const getData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token' });
        }
    
        // At this point, 'decoded' contains the user information (e.g., user ID)
        const userId = decoded.user_id;
        const isSeller = decoded.is_seller;
        // Fetch user data from database based on 'userId'
        const user = await User.getUserData(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        first_name = user.first_name;
        e_mail = user.email;
        // Send user data as a response
        res.json({
          first_name: first_name,
          email: e_mail,
          user_id: userId,
          is_seller: isSeller,
          profile_photo: user.profile_photo
        });
      });
}

const editName = async (req, res) => {
    const user_id = req.params.userID; 
    const {buyerName} = req.body; 
    await User.updateName(buyerName,user_id);
    res.status(201).json({ message: "Successfully updated the Name." });
};

const editAddress = async (req, res) => {
    const user_id = req.params.userID; 
    const {homeNo,street,city,district} = req.body; 
    await User.updateAddress(homeNo,street,city,district,user_id);
    res.status(201).json({ message: "Successfully updated the Address." });
};

const editPhoto = async (req, res) => {
    const user_id = req.params.userID; 
    const file_name = req.file.filename;    
    const file_URL = path.join(file_name)
    await User.updatePhoto(file_URL,user_id);
    res.status(201).json({ message: "Successfully updated the Photo." });
} 

const getUserdata = async (req, res) => {
    const user_id = req.params.userID 
    const user = await User.getUserFullData(user_id);
    res.json({
        first_name: user.first_name,
        email: user.email,
        profile_photo: user.profile_photo,
        home_no: user.home_no,
        street: user.street,
        city: user.city,
        district: user.district,
        contact_no: user.contact_no,
    });
};

const getUserInfo = async (req, res) => {
    const user_id = req.params.userID 
    const user = await User.getUserData(user_id);
    res.json({
        first_name: user.first_name,
        email: user.email,
        profile_photo: user.profile_photo,
    });
};



// const isLogged = async (req, res, next) => {
//     if(req.cookie.jwt){ 
//         try{
//             const decoded = await promisify(jwt.verify)(req.cookie.jwt, process.env.JWT_SECRET) ;
//             const user = await User.getUser(decoded.u_id);
//             req.user = user;
//             next();
//         }catch(err){
//             res.status(401).json({ message: "Invalid token!" });
//         }
//     }
// };


module.exports = {
    loginUser,
    getData,
    editName,
    editAddress,
    editPhoto,
    getUserdata,
    getUserInfo,
}