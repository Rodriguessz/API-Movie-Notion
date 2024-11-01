const knex = require("../../database/knex")
const AppError = require("../../utils/AppError")
const { JWT } = require("../../config/auth")

const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs")


class SessionsController {
    async create(request, response){

        //Gets the email and password send by the user through the request;
        const { email, password } = request.body;
        
        //Retrieves the user from the database with the specific email;
        const user = await knex("users").where({email}).first();    
        if(!user) throw new AppError("The email or the password is incorrect!")
    
        const userAuthenticated = await compare(password, user.password)
        if(!userAuthenticated) throw new AppError("The email or the password is incorrect!")
        
        //Generates the Json Web Token according to the configs on the auth.js file;
        //Send the user id in the Token;
        const token = sign({}, JWT.secret, {
            subject: String(user.id),
            expiresIn: JWT.expiresIn
        })
        
        return response.status(200).json({user, token});
        
    };
}


module.exports = SessionsController;