const { JWT } = require("../../config/auth")
const AppError = require("../../utils/AppError")

const { verify } = require("jsonwebtoken");

function userAuthentication(request, response, next){

    //Gets the user token sent in the request header;
    const authenticationHeaders = request.headers.authorization;
    
    if(!authenticationHeaders) throw new AppError("Token not defined!", 401); 

    //Gets the user token
    const [ ,token] = authenticationHeaders.split(" ")
    
    try{

        //Checks if the token is valid and gets the user_id send in the token;
        const { sub: user_id } = verify(token, JWT.secret)

        //Add in request the property "user". The property will contains the user informations, like id.
        request.user = {
            id: Number(user_id)
        }
        
        return next();

    }catch{
        throw new AppError("Invalid Token", 401)
    }

}


module.exports = userAuthentication;