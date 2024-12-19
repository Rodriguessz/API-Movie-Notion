const knex = require("knex");
const AppError = require("../../utils/AppError");

class MovieNotesRepository{

    async findByTitle({title, user_id}){
       const notes = await knex("movie_notes")
            .select(["movie_notes.id", "movie_notes.title", "movie_notes.description", "movie_notes.rating", "tags.name"])
            .innerJoin("tags", "movie_notes.id", "tags.movie_note_id")
            .whereLike("tags.name", `%${title ?? ''}%`)
            .orWhereLike("movie_notes.title", `%${title ?? ''}%`)
            .where("movie_notes.user_id", user_id)
            .groupBy("movie_notes.id");

        return notes;
    }

    async findById(note_id){
        const note = await knex("movie_notes").where("id", note_id).first();

        return note;
    }

    async findByUserId(user_id){
        const notes = await knex("movie_notes").select(["id", "title"]).where({ user_id });

        return notes;
    }

    async create({title, description, rating, user_id }){
        const [note_id] = await knex("movie_notes").insert({ title, description, rating, user_id });

        return note_id;
    }

    async delete(note_id){

        const note = await knex("movie_notes").delete().where("id", note_id).returning("id")
        return note;
    }

    async update(note, note_id){
        await knex("movie_notes").update(note).where("id", note_id);
    }

    
}


module.exports = MovieNotesRepository;