//Repositories
const UserRepository = require('../../repositories/user/UserRepository');
const userRepository = new UserRepository();

//Services
const UserCreateService = require("../../services/user/UserCreateService");
const UserUpdateService = require("../../services/user/UserUpdateService")

class UserController {
    async create(request, response) {

        const userCreateService = new UserCreateService(userRepository);
        const { name, email, password } = request.body;

        //Create User - Service
        const user_id = await userCreateService.execute({ name, email, password });

        return response.status(200).json({ message: "Account successfully created!", user_id });
    }

    async update(request, response) {

        const userUpdateService = new UserUpdateService(userRepository);

        const { name, email, password, newPassword } = request.body;
        const user_id = request.user.id;

        //Update User - Service
        const user = await userUpdateService.execute({ user_id, name, email, password, newPassword });

        return response.status(200).json({ message: "User sucssesfuly updated!", user })

    }
}



module.exports = UserController;