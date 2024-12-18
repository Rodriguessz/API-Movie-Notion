class MovieCreateService {

    constructor(movieNotesRepository, tagsRepository){
        this.movieNotesRepository = movieNotesRepository
        this.tagsRepository = tagsRepository
    }

    async execute({ title, description, rating, tags }) {

        //Before create a note, checks if the user exists!
        const user = await this.userRepository.findById(user_id);
        if (!user) throw new AppError("User not found!", 400)


        //Checks if the title was sent by the user and creates the note, relating the note to the user!
        if (!title) throw new AppError("The note needs at least a name to be created!")
        const noteId = await this.movieNotesRepository.create({ title, description, rating, user_id });

        //Tags - Checks whether the user wishes to relate the note to a tag, if so, processes the information and creates the tag or tags in question.
        let createdTags = [];

        if (tags.length > 0) {

            //Returns an array of objects that represent the tags to be created
            const processedTags = tags.map(tag => {
                return {
                    name: tag,
                    user_id: user_id,
                    movie_note_id: noteId
                }
            })

            createdTags = await this.tagsRepository.create(processedTags);

        }

        return {
            createdTags,
            noteId,
        }
    }

}

module.exports = MovieCreateService;