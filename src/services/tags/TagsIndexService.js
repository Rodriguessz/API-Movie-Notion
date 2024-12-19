const AppError = require("../../utils/AppError");

class TagsIndexService {

    constructor(tagsRepository, movieNotesRepository) {
        this.tagsRepository = tagsRepository;
        this.movieNotesRepository = movieNotesRepository;

    }

    async execute({ user_id }) {
        //Gets all tags related to the user and checks if the user really has tags
        const userTags = await this.tagsRepository.findByUserId(user_id);
        if (!userTags) throw new AppError("There is no tags related to the user!", 400);

        //Gets the user notes to combine with the respective tags;
        const userNotes = await this.movieNotesRepository.findByUserId(user_id);

        //Returns a new tags array, but now , with the related note;
        const processedTags = userTags.map(tag => {
            const filteredNote = userNotes.filter(note => note.id == tag.movie_note_id).map(filteredTag => filteredTag.title);

            return {
                ...tag,
                releated_note: filteredNote,
            }
        })


        return processedTags;
    };
}


module.exports = TagsIndexService;