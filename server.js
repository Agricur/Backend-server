const app = require("./app");
const pool = require("./db/db");


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