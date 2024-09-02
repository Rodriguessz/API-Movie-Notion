const AppError = require("../../utils/AppError")
const knex = require("../../database/knex")

class MovieController {
    //#region Create Method
    async create(request, response) {
        //Gets the user_id to create a movie note related to this id;
        const { user_id } = request.params 
        const { title, description , rating } = request.body;
        const { tags } = request.query;

        //Checks if the title was sent by the user and creates the note, relating the note to the user!
        if(!title) throw new AppError("The note needs at least a name to be created!")
        const [noteId] = await knex("movie_notes").insert({title, description, rating, user_id});

        //Tags - Checks whether the user wishes to relate the note to a tag, if so, processes the information and creates the tag or tags in question.
        if(tags){
            const arrayTags = tags.split(",")
            //Returns an array of objects that represent the tags to be created
            const processedTags = arrayTags.map(tag => {
                return {
                    name: tag,
                    user_id: user_id,
                    movie_note_id: noteId
                }
            })

            const createdTags = await knex("tags").insert(processedTags).returning(["id", "name"]);

            return response.status(200).json({message: "The note and tags was sucessfuly created!", note_id: noteId, user_id: user_id, tags: createdTags})

        }
        return response.status(200).json({message: "The note was sucessfuly created!", note_id: noteId, user_id: user_id})
    }
    //#endregion
}




module.exports = MovieController//Tags - Checks whether the user wishes to relate the note to a tag, if so, processes the information and creates the tag or tags in question.