const app = require("./app");
const pool = require("./db/db");

 
const express = require("express");
const cors = require("cors");


process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('Shutting down...');
    process.exit(1);
});


if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path:"config/.env"
    })
}


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});  