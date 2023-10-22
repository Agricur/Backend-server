const pool = require("../db/db");
const bcrypt = require("bcrypt");

const getMail = "SELECT email FROM public.admin WHERE email = $1";
const insertAdmin =
  "INSERT INTO public.admin(first_name,last_name,contact_no,email,password) VALUES ($1,$2,$3,$4,$5)";
const getAdminID = "SELECT admin_id FROM public.admin WHERE email = $1";
const getAdminByMail = "SELECT * FROM public.admin WHERE email = $1";
const getAdminByID = "SELECT * FROM public.admin WHERE admin_id = $1";
const updatName = "UPDATE public.admin SET first_name = $1, last_name = $2 WHERE admin_id = $3"
const updateContact = "UPDATE public.admin SET contact_no = $1 WHERE admin_id = $2"
const updateImage = "UPDATE public.admin SET profile_photo = $1 WHERE admin_id = $2"
const updatePassword = "UPDATE public.admin SET password = $1 WHERE admin_id = $2"

const getAdmin = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(getAdminID, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        admin_id = results.rows[0].admin_id;
        resolve({ admin_id });
      }
    });
  });
};

const getAdminDetails = (admin_id) => {
  return new Promise((resolve, reject) => {
    pool.query(getAdminByID, [admin_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        first_name = results.rows[0].first_name;
        last_Name = results.rows[0].last_name;
        email = results.rows[0].email;
        contact_no = results.rows[0].contact_no;
        profile_photo = results.rows[0].profile_photo;
        resolve({ first_name, last_Name, email, contact_no, profile_photo });
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

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
};

const createAdmin = (first_Name, last_Name, contact_no, email, password) => {
  console.log(first_Name, last_Name, contact_no, email, password);
  return new Promise((resolve, reject) => {
    hashPassword(password).then((hashedPassword) => {pool.query(insertAdmin,[first_Name, last_Name, contact_no, email, hashedPassword],(error, results) => {
          if (error) {
            throw error;
          } else {
            resolve("Admin account created successfully");
          }
        }
      );
    });
  });
};

const checkPassword = (password, email) => {
  return new Promise((resolve, reject) => {
    pool.query(getAdminByMail, [email], (error, results) => {
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

const updateAdminName = (admin_id,first_name,last_name) => {
  return new Promise((resolve, reject) => { 
    pool.query(updatName, [first_name,last_name,admin_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve("Admin name updated successfully");
      }
    });
  });
}

const updateAdminContact = (admin_id,contact) => {
  return new Promise((resolve, reject) => { 
    pool.query(updateContact, [contact,admin_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve("Admin contact updated successfully");
      }
    });
  });
}

const updateAdminProfilePhoto = (admin_id,profile_photo) => { 
  return new Promise((resolve, reject) => { 
    pool.query(updateImage, [profile_photo,admin_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve("Admin profile photo updated successfully");
      }
    });
  });
}

const updateAdminPassword = (admin_id,password) => {
  return new Promise((resolve, reject) => { 
    hashPassword(password).then((hashedPassword) => {pool.query(updatePassword, [hashedPassword,admin_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve("Admin password updated successfully");
      }
    });
  });
  });
}

module.exports = {
    createAdmin,
    checkMail,
    checkPassword,
    getAdmin,
    getAdminDetails,
    updateAdminName,
    updateAdminContact,
    updateAdminProfilePhoto,
    updateAdminPassword,
};
