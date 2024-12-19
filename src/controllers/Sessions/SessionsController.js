//Repositories
const UserRepository = require("../../repositories/user/UserRepository");
const userRepository = new UserRepository();

//Services
const SessionsCreateService = require("../../services/session/SessionCreateService");


class SessionsController {
    async create(request, response){

        //Gets the email and password send by the user through the request;
        const { email, password } = request.body;
    
        const sessionCreateService = new SessionsCreateService(userRepository);       
        
        const {user , token } = sessionCreateService.execute({email, password}); 
        
        return response.status(200).json({user, token});
        
    };
}


module.exports = SessionsController;