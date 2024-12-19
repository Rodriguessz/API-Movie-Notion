const knex = require("../../database/knex");
const AppError = require("../../utils/AppError");

//Repositories
const TagsRepository = require("../../repositories/tags/TagsRepository");
const tagsRepository = new TagsRepository();

const MovieNotesRepository = require("../../repositories/movie_notes/MovieNotesRepository");
const movieNotesRepository = new MovieNotesRepository();


//Services
const TagsIndexService = require("../../services/tags/TagsIndexService")
const TagsDeleteService = require("../../services/tags/TagsDeleteService")

class TagsController {

    async index(request, response) {
        const user_id = request.user.id;
        const tagsIndexService = new TagsIndexService(tagsRepository, movieNotesRepository);

        const processedTags = tagsIndexService.execute({user_id});

        return response.status(200).json(processedTags);

    };

    async delete(request, response) {
        const { tag_id } = request.params;
        const tagsDeleteService = new TagsDeleteService();
        
        await tagsDeleteService.execute({tag_id});

        return response.status(200).json({ message: "Tag sucessfuly deleted!", tag_id })

    };
}


module.exports = TagsController;