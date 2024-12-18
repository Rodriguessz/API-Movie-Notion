class MovieIndexService{
    constructor(movieNotesRepository, tagsRepository){
        this.movieNotesRepository = movieNotesRepository;
        this.tagsRepository = tagsRepository;
    }

    async execute({title, user_id}){

         //Gets the movie notes according to the filters sent by the user.
         const movieNotes = await this.movieNotesRepository.findByTitle({title, user_id})

         //Gets all tags related to the user and combines them with their notes
         const userTags = await this.tagsRepository.findByUserId(user_id);
 
         const processedNotes = movieNotes.map(note => {
 
             //Returns an array with just the tags that are related to the current loop note.
             const filteredTags = userTags.filter(tag => note.id == tag.movie_note_id).map(filteredTag => filteredTag.name)
 
             //For each iterable item, returns an object representing the note and the respective tags belonging to it.
             return {
                 ...note,
                 tags: filteredTags
             }
         })

         return processedNotes;

    }

}

module.exports = MovieIndexService;