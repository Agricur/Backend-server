const checkMail = "SELECT * FROM public.user WHERE email = $1";
const createUser = "INSERT INTO public.user(ip_address,first_name,last_name,contact_no,email,password) VALUES ($1,$2,$3,$4,$5,$6)";

module.exports = {
    checkMail,  
    createUser,
}