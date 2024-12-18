class MovieDeleteService{

    constructor(movieNotesRepository){
        this.movieNotesRepository = movieNotesRepository;
    }

    async exectute({note_id}){
           //Checks if the note exists and it was possible to delete, else throws an error to the user!
           const deletedNote = await this.movieNotesRepository.delete(note_id);
           if (!deletedNote) throw new AppError("Note not found! It was not possible delete.", 400)

            return deletedNote;
    }
}

module.exports = MovieDeleteService;