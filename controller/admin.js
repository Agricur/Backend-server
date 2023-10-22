const { Console, profile } = require("console");
const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const path = require("path");

const createAdmin = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const emailExists = await Admin.checkMail(email);
  console.log(emailExists);
  if (emailExists) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    const message = await Admin.createAdmin(
      firstName,
      lastName,
      phoneNumber,
      email,
      password 
    );
    res.status(201).json(message);
  }
};

const loginAdmin = async (req, res) => {
    const {email,password} = req.body;
    const emailExists = await Admin.checkMail(email);
    if(!emailExists){
        res.status(400).json({ message: "Account doesn't exists!" });
    }else{
        const passwordExists = await Admin.checkPassword(password,email);
        if(passwordExists){
            const type = 'admin'
            const {admin_id} = await Admin.getAdmin(email); 
            const token = jwt.sign({ admin_id,type}, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_TIME,
            }); 
                       
            res.status(201).json({ message: "Successfully logged in!",token: token, admin_id: admin_id, type: type });
        }else{
            res.status(400).json({ message: "Username or Password is incorrect!" });
        } 
    }
}

const getData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token' });
        }
        const adminId = decoded.admin_id;
        const type = decoded.type;
        const admin = await Admin.getAdminDetails(adminId);
        if (!admin) {
          return res.status(404).json({ error: 'admin not found' });
        }
        first_name = admin.first_name;
        email = admin.email;
        last_name = admin.last_Name;
        contact = admin.contact_no;
        profile_photo = admin.profile_photo;

        // Send user data as a response
        res.json({
          first_name: first_name,
          email: email,
          last_name: last_name,
          admin_id: adminId,
          contact: contact,
          profile_photo: profile_photo,
          type: type, 
        });
      });
}

const updateAdminName = async (req, res) => {
    const admin_id = req.params.adminId;
    const {firstName,lastName} = req.body;
    const message = await Admin.updateAdminName(admin_id,firstName,lastName);
    res.status(201).json(message);
}

const updateAdminContact = async (req, res) => {
    const admin_id = req.params.adminId;
    const {contact} = req.body;
    const message = await Admin.updateAdminContact(admin_id,contact);
    res.status(201).json(message);
}

const updateAdminProfilePhoto = async (req, res) => {
    const admin_id = req.params.adminId;

    const file_name = req.file.filename; 
    const profilePhoto = path.join(file_name)
    console.log(profilePhoto);
    const message = await Admin.updateAdminProfilePhoto(admin_id,profilePhoto);
    res.status(201).json(message);
}

const updateAdminPassword = async (req, res) => {
    const admin_id = req.params.adminId;
    const {password} = req.body;
    const message = await Admin.updateAdminPassword(admin_id,password);
    res.status(201).json(message);
}

module.exports = {
  createAdmin,
  loginAdmin,
  getData,
  updateAdminName,
  updateAdminContact,
  updateAdminProfilePhoto,
  updateAdminPassword,
};
