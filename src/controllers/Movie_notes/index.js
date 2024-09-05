const AppError = require("../../utils/AppError")
const knex = require("../../database/knex")

class MovieController {
    
    //#region Index Method

    async index(request, response){

        const { user_id } = request.params;
        const { tags , title } = request.query;
        
        let movieNotes;
        //Checks if the user is filtering the note by any tag
        if(tags){
            const filteredTags = tags.split(",")

            //Gets the movie notes according to the filters sent by the user.
            movieNotes = await knex("movie_notes")
            .select(["movie_notes.id", "movie_notes.title as note_title", "movie_notes.description"])
            .innerJoin("tags", "movie_notes.id", "tags.movie_note_id")
            .whereIn("tags.name", filteredTags)
            .whereLike("note_title", `%${title}%`)
            .where("movie_notes.user_id", user_id)
   
        }else{
            movieNotes = await knex("movie_notes").whereLike("title",`%${title}%`).where({user_id})
        }

        //Gets all tags related to the user and combines them with their notes
        const userTags = await knex("tags").where({user_id})

        const processedNotes = movieNotes.map(note => {

            //Returns an array with just the tags that are related to the current loop note.
            const filteredTags = userTags.filter(tag => note.id == tag.movie_note_id).map(filteredTag => filteredTag.name)
            
            //For each iterable item, returns an object representing the note and the respective tags belonging to it.
             return {
                ...note,
                tags: filteredTags
            }
        })

        return response.status(200).json(processedNotes)

    }
    //#endregion
    
    //#region Create Method
    async create(request, response) {
        //Gets the user_id to create a movie note related to this id;
        const { user_id } = request.params 
        const { title, description , rating } = request.body;
        const { tags } = request.query;


        //Before create a note, checks if the user exists!
        const user = await knex("users").where("id", user_id ).first()
        if(!user) throw new AppError("User not found!", 400)


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

    //#region Delete Method
    async delete (request, response){
        const { note_id } = request.params;
        //Checks if the note exists and it was possible to delete, else throws an error to the user!
        const deletedNote = await knex("movie_notes").delete().where("id", note_id).returning("id")
        if(!deletedNote) throw new AppError("Note not found! It was not possible delete.", 400)

        return response.status(200).json({message: "Note successfuly deleted!", note_id})
        
    }
    //#endregion

    //#region Update Method

    async update(request, response){


        const { title , description , rating } = request.body;
        const { note_id } = request.params;

        const movieNote = await knex("movie_notes").where("id", note_id).first();
        if(!movieNote) throw new AppError("Movie note not found!", 400);

        //Formats the date to ISO8601,  but with some differences (YYYY/MM/DD HH:mm:ss).
        const updated_at = new Date().toLocaleString('sv-SE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });

        // Checks each property sent by the user and creates a new note object to update on the database;
        const processedMovieNote = {
            title: title || movieNote.title,
            description: description || movieNote.description,
            rating: rating || movieNote.rating,
            updated_at
        }

        if(processedMovieNote.rating < 0 || processedMovieNote.rating > 5) throw new AppError("The rate must be between 0 and 5, where 0 means very bad and 5 very good!")
        
    
        await knex("movie_notes").update(processedMovieNote).where("id", note_id);

        return response.status(200).json({message: "Movie note update successfuly!", note_id})
    }

    //#endregion

    //#region Show Method
    async show(request, response){
        const { note_id } = request.params;

        //Gets the note according to the note_id sent on request and cheks if exists!
        const movieNote = await knex("movie_notes").select(["id", "title", "description", "rating", "created_at", "updated_at"]).where("id", note_id).first();
        if(!movieNote) throw new AppError("Movie note not found!")

        //Gets all tags related to the movie
        const movieNoteTags = (await knex("tags").where("movie_note_id", note_id)).map(tag => tag.name);

        const processedNote = {
            ...movieNote,
            tags: movieNoteTags
        }

        return response.status(200).json(processedNote)
    }
    //#endregion
}

module.exports = MovieController