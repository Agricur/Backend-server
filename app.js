const express = require("express");
// const ErrorHandler = require("./utils/ErrorHandler");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({extended : true,limit:"50mb"}));

 
// config
if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path:"config/.env"
    })
}

//import routes
const buyerRoutes = require("./Routes/buyerRoutes");
const sellerRoutes = require("./Routes/sellerRoutes");
const userRoutes = require("./Routes/userRoutes");
const shopRoutes = require("./Routes/shopRoutes");
const productRouts = require("./Routes/productRoutes")


app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/product', productRouts);


//error handling
// app.use(ErrorHandler); 

 
module.exports = app; 