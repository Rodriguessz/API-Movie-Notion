class MovieShowService {
    constructor(movieNotesRepository, tagsRepository) {
        this.movieNotesRepository = movieNotesRepository;
        this.tagsRepository = tagsRepository;

    }

    async execute({note_id }) {
        //Gets the note according to the note_id sent on request and cheks if exists!
        const movieNote = await userRepository.findById(note_id);
        if (!movieNote) throw new AppError("Movie note not found!")

        //Gets all tags related to the movie
        const movieNoteTags = await this.tagsRepository.findByMovieId(note_id);

        const processedNote = {
            ...movieNote,
            tags: movieNoteTags
        }

        return processedNote;
    }
}


module.exports = MovieShowService;