const AppError = require("../../utils/AppError")
const knex = require("../../database/knex");

const TagsRepository = require("../../repositories/tags/TagsRepository");
const tagsRepository = new TagsRepository();

const MovieNotesRepository = require("../../repositories/movie_notes/MovieNotesRepository");
const movieNotesRepository = new MovieNotesRepository();

const UserRepository = require("../../repositories/user/UserRepository");
const userRepository = new UserRepository();


//Services
const MovieIndexService = require("../../services/movie_notes/MovieIndexService");
const MovieCreateService = require("../../services/movie_notes/MovieCreateService");
const MovieCreateService = require("../../services/movie_notes/MovieCreateService");
const MovieDeleteService = require("../../services/movie_notes/MovieDeleteService");
const MovieUpdateService = require("../../services/movie_notes/MovieUpdateService");
const MovieShowService = require("../../services/movie_notes/MovieShowService");




class MovieController {

    async index(request, response) {

        const user_id = request.user.id;
        const { title } = request.query;

        const movieIndexService = new MovieIndexService(movieNotesRepository, tagsRepository);

        const processedNotes = await movieIndexService.execute({ title, user_id });

        return response.status(200).json(processedNotes)
    }

    async create(request, response) {

        const user_id = request.user.id;
        const { title, description, rating, tags } = request.body;

        const movieCreateService = new MovieCreateService(movieNotesRepository, tagsRepository);

        const { createdTags, noteId } = await movieCreateService.execute({ title, description, rating, tags });

        return response.status(200).json({ message: "The note was sucessfuly created!", note_id: noteId, user_id: user_id, createdTags })
    }

    async delete(request, response) {
        const { note_id } = request.params;

        const movieDeleteService = new MovieDeleteService(movieNotesRepository);
        await movieDeleteService.exectute({ note_id });

        return response.status(200).json({ message: "Note successfuly deleted!", note_id })

    }

    async update(request, response) {

        const { title, description, rating } = request.body;
        const { note_id } = request.params;
        const movieUpdateService = new MovieUpdateService();

        await movieUpdateService.execute({ title, description, rating, note_id });

        return response.status(200).json({ message: "Movie note update successfuly!", note_id })
    }

    async show(request, response) {
        const { note_id } = request.params;
        const movieShowService = new MovieShowService(movieNotesRepository, tagsRepository);

        const processedNote = movieShowService.execute({ note_id });

        return response.status(200).json(processedNote)
    }


}

module.exports = MovieController