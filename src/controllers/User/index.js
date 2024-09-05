const knex = require("../../database/knex")
const { hash, compare } = require("bcryptjs")
const AppError = require("../../utils/AppError")

class UserController {
    //#region Index Method
    async index(request, response){
        
        const { is_admin } = request.query;
        
        if(!Boolean(is_admin)) throw new AppError("You don't have the correct permissions to access this functionality!")
        
        //Gets all users on the application!
        const users = await knex("users").select(["id", "name", "email", "created_at"]);

        //Gets all notes and tags in application and combines with the correct user!
        const movieNotes = await knex("movie_notes").select(["id", "user_id","title", "description", "rating", "created_at"]);
        const tags = await knex("tags").select(["user_id", "movie_note_id" ,"name"])

        //Combines the tags to the related movie note;
        const processedMovies = movieNotes.map(note => {
            const filteredTags = tags.filter(tag => tag.movie_note_id == note.id).map(filteredTag => filteredTag.name);
            
            return {
                ...note,
                tags: filteredTags,
            }
        })

        //Combines the correct user with the related notes;
        const processedUsers = users.map(user => {

            const userNotes = processedMovies.filter(note => note.user_id == user.id).map(filteredNote => {
                return {
                    title: filteredNote.title,
                    description: filteredNote.description,
                    rating: filteredNote.rating,
                    tags: filteredNote.tags,
                    created_at: filteredNote.created_at

                }
            });
            
            return {
                ...user,
                movies: userNotes
            }
        })


        return response.status(200).json(processedUsers)
    }
    //#endregion
   
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
        
        //Gets the infos to udpate the user
        const { name, email, password , newPassword } = request.body;
        const { user_id } = request.params;

        //Gets the user and checks if the email sent through the request is already been used by another user; 
        const user = await knex("users").where("id", user_id).first();
        if (!user) throw new AppError("User not found!", 400)

        //Uses the whereNot operator to ensure that the user retrieved through the email query is not the same user retrieved by the id sent through the request
        if(email){
            const userExists = await knex("users").where({email}).whereNot("id", user_id).first();
            if(userExists) throw new AppError("The email address is already associated with another account!")
        }

        //Checks the requirements to update the account password
        if(!password && newPassword) throw AppError("To update password, the current password must be informed!")
        
        if(password && newPassword){
            //The "compare" method of the bcryptjs library checks whether the string passed as an argument is equal to the encrypted string
            const passwordMatches = await compare(password, user.password)
            if(!passwordMatches) throw new AppError("The current password is incorrect!")

            user.password = await hash(newPassword, 8);
        }

        //Prepare the infos and updated the user
        const updatedData = {
            name: name || user.name,
            email: email || user.email,
            password: user.password
        }

        await knex("users").update(updatedData).where("id", user_id);

        return response.status(200).json({message: "User sucssesfuly updated!", user_id: user_id})

    }
    //#endregion
    
    //#region Delete Method
    async delete(request, response){

        const { user_id } = request.params;

        const userExists = await knex("users").delete().where("id", user_id).returning("id");

        if(!userExists) throw new AppError("User not found!", 400)

        return response.status(200).json({message: "User sucssesfuly deleted!", user_id})
        
        
    }
    //#endregion

    
}



module.exports = UserController;