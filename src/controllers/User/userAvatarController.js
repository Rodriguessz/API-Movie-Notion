const AppError = require("../../utils/AppError")
const knex = require("../../database/knex")

const DiskStorage = require("../../providers/DiskStorage")
const diskStorage = new DiskStorage();



class UserAvatarController {
    async update(request, response) {

        const user_id = request.user.id;
        const avatarFile = request.file.filename;

        const user = await knex("users").where({id : user_id}).first();
        if (!user) throw new AppError("It is necessary to authenticate with the application again.", 401)

        try {

            if (user.avatar) {
                //Delete the current avatar file.
                await diskStorage.delete(user.avatar)
            }
            
            //Move the uploaded file to the uploads folder
            const fileName = await diskStorage.save(avatarFile);           
            
            //Patch the user avatar on the database
            user.avatar = fileName;

            await knex("users").update(user).where({id : user_id});

            return response.status(200).json({message: "Avatar successfuly updated!", user});

        } catch{
            throw new AppError("It was not possible complete the action")
        }
        
    }
}


module.exports = UserAvatarController