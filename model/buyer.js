const checkMail = "SELECT * FROM public.user WHERE email = $1";
const createUser = "INSERT INTO public.user(ip_address,first_name,last_name,contact_no,email,password) VALUES ($1,$2,$3,$4,$5,$6)";
const insertUserAdress = "INSERT INTO public.user_address(user_id,number,street,city,district) VALUES ($1,$2,$3,$4,$5)";
const getUserID = "SELECT user_id FROM public.user WHERE email = $1";
// const getAllUsers = "SELECT * FROM public.user";

module.exports = {
    checkMail,  
    createUser,
    insertUserAdress,
    getUserID,
    // getAllUsers,
}