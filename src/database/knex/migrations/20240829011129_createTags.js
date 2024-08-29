
exports.up = (knex) => {
    return knex.schema.createTable("tags", (table) => {
        table.increments("id");
        table.integer("movie_note_id").references("id").inTable("movie_notes").onDelete("CASCADE");
        table.integer("user_id").references("id").inTable("users");
        table.text("name");
    })
}

exports.down = (knex) => {
    return knex.schema.dropTable("tags")
}