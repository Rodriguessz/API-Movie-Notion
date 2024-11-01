const knex = require("../../database/knex")
const AppError = require("../../utils/AppError");

class TagsController {
    
    //#region Index Method 
    async index(request, response){
        const user_id  = request.user.id;
        
        //Gets all tags related to the user and checks if the user really has tags
        const userTags = await knex("tags").where({user_id});
        if(!userTags) throw new AppError("There is no tags related to the user!", 400);

        //Gets the user notes to combine with the respective tags;
        const userNotes = await knex("movie_notes").select(["id", "title"]).where({user_id});

        //Returns a new tags array, but now , with the related note;
        const processedTags = userTags.map(tag => {
            const filteredNote = userNotes.filter(note => note.id == tag.movie_note_id).map(filteredTag => filteredTag.title);
            
            return {
                ...tag,
                releated_note : filteredNote,
            }
        })

        return response.status(200).json(processedTags);

     };
    //#endregion
    
    //#region Delete Method
     async delete(request, response){
        const { tag_id } = request.params;
        
        //Checks if the tag really exists before delete!
        const tag = await knex("tags").where("id", tag_id).first();
        if(!tag) throw new AppError("Tag was not found!", 400);

        //Deletes the tag;
        await knex("tags").del().where("id", tag_id)

        return response.status(200).json({message: "Tag sucessfuly deleted!", tag_id})
        
     }
    //#endregion
}   


module.exports = TagsController;