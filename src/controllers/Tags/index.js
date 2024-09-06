const knex = require("../../database/knex")
const AppError = require("../../utils/AppError");

class TagsController {
    
    //#region Index Method 
    async index(request, response){
        const { user_id } = request.params;
        
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

    //#region Create Method 
     async create(request, response){
        const { user_id , note_id }  = request.params;
        const { name } = request.body;
        
        const user = await knex("users").where("id", user_id).first();
        if(!user) throw new AppError("User not found!", 400);

        const note = await knex("movie_notes").where("id", note_id).first();
        if(!note) throw new AppError("Movie note not found!", 400);
        
        const [newTagId] = await knex("tags").insert({name, user_id, movie_note_id: note_id});

        return response.status(200).json({message: "Tag sucessfuly created!", tag_id: newTagId})

        
     }
    //#endregion


    //#region Update Method
     async update(request, response){
        const { tag_id } = request.params;
        const { name } = request.body;

        //Gets the tag and cheks if really exists on application before update!
        const tag = await knex("tags").where("id", tag_id).first();
        if(!tag) throw new AppError("Tag not found!", 400)
        
        //Update the tag!
        await knex("tags").update({name}).where("id", tag_id);

        return response.status(200).json({message: "Tag sucessfuly updated!", tag_id})

     }
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

    //#region Show Method
     async show(request,response){
        const { tag_id } = request.params;

        const tag = await knex("tags").where("id", tag_id);
        if(!tag) throw new AppError("Tag not found!", 400);

        const tagWithNote = await knex("movie_notes")
         .select(["tags.id", "tags.name", "movie_notes.title as related_note"])
        .innerJoin("tags", "tags.movie_note_id", "movie_notes.id")
        .where("tags.id", tag_id).first();
        
        return response.status(200).json(tagWithNote);
     }
    //#endregion
}   


module.exports = TagsController;