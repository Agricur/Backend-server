const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// app.use(express.json());
app.use(express.static(path.join(__dirname, '../Agricur-E-Marketplace/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Agricur-E-Marketplace/build', 'index.html'));
  });

app.use(cookieParser());
app.use(cors());
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({extended : true,limit:"50mb"}));

 

if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path:"config/.env"
    })
}


const buyerRoutes = require("./Routes/buyerRoutes");
const sellerRoutes = require("./Routes/sellerRoutes");
const userRoutes = require("./Routes/userRoutes");
const shopRoutes = require("./Routes/shopRoutes");
const productRouts = require("./Routes/productRoutes")
const cartRoutes = require("./Routes/cartRoutes");
const adminRoutes = require("./Routes/adminRoutes");


app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes); 
app.use('/api/product', productRouts);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);



 
module.exports = app; 