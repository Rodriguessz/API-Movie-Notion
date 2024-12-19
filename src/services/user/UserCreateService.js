const AppError = require("../../utils/AppError");
const { hash, compare } = require("bcryptjs")



class UserCreateService {

    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({name, email, password}){
        if (!email || !name || !password) {
            throw new AppError("To create an account you must fill all required fields!", 400)
        }

        // Try to get a user in the database with the same email sendo by the user;
        const emailInUse = await this.userRepository.findByEmail({email});        

        //Checks if the email has already been used by another user;
        if (emailInUse) {
            throw new AppError("The email is already being used!", 400)
        }

        //Encrypt the user's password using the bcrypt library
        const ecryptedPassword = await hash(password, 8);


        const user_id = await this.userRepository.create({ name, email, password: ecryptedPassword })

        return user_id;
    }
}


module.exports = UserCreateService;
