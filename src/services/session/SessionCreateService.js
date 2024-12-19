const knex = require("knex");
const AppError = require("../../utils/AppError");
const { JWT } = require("../../config/auth");

const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");



class SessionsCreateService {

    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ email, password }) {
       
        //Retrieves the user from the database with the specific email;
        const user = await this.userRepository.findByEmail({email})
        if (!user) throw new AppError("The email or the password is incorrect!")

        const userAuthenticated = await compare(password, user.password)
        if (!userAuthenticated) throw new AppError("The email or the password is incorrect!")

        //Generates the Json Web Token according to the configs on the auth.js file;
        //Send the user id in the Token;
        const token = sign({}, JWT.secret, {
            subject: String(user.id),
            expiresIn: JWT.expiresIn
        })
        
        return { user , token }

    }

}


module.exports = SessionsCreateService;