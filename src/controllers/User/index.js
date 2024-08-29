const knex = require("../../database/knex")
const { hash, compare } = require("bcryptjs")
const AppError = require("../../utils/AppError")

class UserController {
    
    //#region Create Method 
    async create(request, response){
        
        const {name, email , password} = request.body;

        if(!email || !name || !password){
            throw new AppError("To create an account you must fill all required fields!", 400)
        }

        // Try to get a user in the database with the same email sendo by the user;
        const [emailInUse] = await knex("users").where({email});

        //Checks if the email has already been used by another user;
        if(emailInUse){
            throw new AppError("The email is already being used!", 400)
        }

        //Encrypt the user's password using the bcrypt library
        const ecryptedPassword = await hash(password, 8);


        const [user_id] = await knex("users").insert({name, email, password: ecryptedPassword});
        
        return response.status(200).json({message: "Account successfully created!", user_id});
    }    
    //#endregion

    //#region Update Method
    async update(request, response){
        
        const { user_id } = request.params;

        //Get the infos to update the user Account.
        const { name , email , password, newPassword } = request.body;

        // Gets the user according to the user_id sent on request params;
        const [user] = await knex("users").where("id", user_id);
    
        if(password){
            const currentPassword = user.password;
            //Checks if the current password matches with the old password sent by the userç; 
            const passwordVerification = await compare(password, currentPassword)
        }

        

    }
    //#endregion
}



module.exports = UserController;