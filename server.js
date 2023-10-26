const app = require("./app");
const pool = require("./db/db");

 
const express = require("express");
const cors = require("cors");


// app.use(cors());
// app.use(express.json());
// app.post("/api/user/address",async(req,res)=>{
//     try{
//         const {user_id,number,street,city,district} = req.body;
//         const s = await pool.query("INSERT INTO public.user_address(user_id,number,street,city,district) VALUES ($1,$2,$3,$4,$5)",[user_id,number,street,city,district]);
//         res.json(s.rows);
//     }catch(err){
//         console.log(err.message);
//     }   
// }) 

// app.use(cors());
// app.use(express.json());
// app.post("/",async(req,res)=>{
//     try{
//         const {ip_address,first_name,last_name,contact_no,email,password} = req.body;
//         const s = await pool.query("INSERT INTO public.user (ip_address,first_name,last_name,contact_no,email,password) VALUES ($1,$2,$3,$4,$5,$6)",[ip_address,first_name,last_name,contact_no,email,password]);
//         res.json(s.rows);
//     }catch(err){
//         console.log(err.message);
//     }   
// }) 



// app.post("/login",async(req,res)=>{
//     try{
        
//     const {courier_service}=req.body;
//     const s = await pool.query("INSERT INTO courier (courier_service) VALUES ($1)",[courier_service]);
//     res.json(s.rows);
//     }catch(err){
//         console.log(err.message);
//     }
// })



// handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('Shutting down...');
    process.exit(1);
});

// config
if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path:"config/.env"
    })
}

// create server
// const server = app.listen(process.env.PORT, process.env.IPADDRESS, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// })

// create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});  