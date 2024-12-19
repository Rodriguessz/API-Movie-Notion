const knex = require("knex");

class TagsRepository {

    async findById(tag_id) {
        const tag = await knex("tags").where("id", tag_id).first();

        return tag;
    }

    async findByUserId(user_id) {
        const tags = await knex("tags").where({ user_id })

        return tags;
    }

    async findByMovieId(note_id) {
        const tags = (await knex("tags").where("movie_note_id", note_id)).map(tag => tag.name);

        return tags;
    }
    
    async create(tags) {
        const tags = await knex("tags").insert(processedTags).returning(["id", "name"]);
        return tags
    }

    async delete(tag_id){
        await knex("tags").del().where("id", tag_id)

        return tag_id;
    }
}

module.exports = TagsRepository;