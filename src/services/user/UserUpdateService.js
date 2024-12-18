class UserUpdateService {

    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({user_id, name, email, password, newPassword}) {
        //Gets the user and checks if the email sent through the request is already been used by another user; 
        const user = await this.userRepository.findById(user_id);
        
        if (!user) throw new AppError("User not found!", 400)

        //Uses the whereNot operator to ensure that the user retrieved through the email query is not the same user retrieved by the id sent through the request
        if (email) {
            const userExists = await this.userRepository.findByEmail({user_id, email, exists: true});
            if (userExists) throw new AppError("The email address is already associated with another account!")
        }

        //Checks the requirements to update the account password
        if (!password && newPassword) throw AppError("To update password, the current password must be informed!")

        if (password && newPassword) {
            //The "compare" method of the bcryptjs library checks whether the string passed as an argument is equal to the encrypted string
            const passwordMatches = await compare(password, user.password)
            if (!passwordMatches) throw new AppError("The current password is incorrect!")

            user.password = await hash(newPassword, 8);
        }

        user.name = name || user.name,
            user.email = email || user.email,
            user.password = user.password


        await this.userRepository.update(user);

    }
}


module.exports = UserUpdateService;