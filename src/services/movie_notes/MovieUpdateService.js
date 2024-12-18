class MovieUpdateService{
    async execute({title, description, rating, note_id}){
        const movieNote = await this.movieNotesRepository.findById(note_id);
        if (!movieNote) throw new AppError("Movie note not found!", 400);

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

        if (processedMovieNote.rating < 0 || processedMovieNote.rating > 5) throw new AppError("The rate must be between 0 and 5, where 0 means very bad and 5 very good!")


        await this.movieNotesRepository.update(note, note_id)
    }
}

module.exports = MovieUpdateService;