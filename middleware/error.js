const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(error.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message,400);
    }

    //duplicate key error
    if(error.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ErrorHandler(message,400);
    }

    //wrong jwt error
    if(error.name === "JsonWebTokenError") {
        const message = `url is invalid. Try Again!!!`;
        error = new ErrorHandler(message,400);
    }

    //jwt expired error
    if(error.name === "TokenExpiredError") {
        const message = `url is expired. Try Again!!!`;
        error = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message    
    })
}