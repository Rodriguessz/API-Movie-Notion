const AppError = require("../../utils/AppError");


class TagsDeleteService {

    constructor(tagsRepository){
        this.tagsRepository = tagsRepository;
    }

    async execute({tag_id}){
         //Checks if the tag really exists before delete!
         const tag = await tagsRepository.findById(tag_id);
         if (!tag) throw new AppError("Tag was not found!", 400);
 
         //Deletes the tag;
         await this.tagsRepository.delete(tag_id);
 
    }
}


module.exports = TagsDeleteService;