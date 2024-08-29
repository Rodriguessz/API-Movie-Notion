const AppError = require("../AppError");

function errorCatcher(error, request, response, next){

    const errors = {
        400: "Client Error",
        300: "Redirection",
        100: "Informational"
    }
    if(error instanceof AppError ){
        return response.status(error.status).json({status: errors[error.status], status_code: error.status, message: error.message} )
    }

    // In case of internal errors
    return response.status(500).json({status: "Internal Server Error", status_code: 500, message: error.message})
    
}


module.exports = errorCatcher;