const checkMail = "SELECT * FROM public.user WHERE email = $1";
const createShop = "INSERT INTO public.shop(shop_name,user_id) VALUES ($1,$2)";  
const createUser = "INSERT INTO public.user(ip_address,first_name,last_name,contact_no,is_seller,email,password) VALUES ($1,$2,$3,$4,$5,$6,$7)";
const insertShopAdress = "INSERT INTO public.shop_address(shop_id,number,street,city,district) VALUES ($1,$2,$3,$4,$5)";
const getUserID = "SELECT user_id FROM public.user WHERE email = $1";
const getShopID = "SELECT shop_id FROM public.shop WHERE user_id = $1";
// const getAllUsers = "SELECT * FROM public.user";

module.exports = {
    checkMail,  
    createShop,
    createUser,
    insertShopAdress,
    getUserID,
    getShopID,
    // getAllUsers,
}