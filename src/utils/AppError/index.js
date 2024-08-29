class AppError {
  
    message;
    status;
    //By default, the status error is 400;
    constructor(message, status = 400){
        this.message = message
        this.status = status
    }
    
}


module.exports = AppError; 