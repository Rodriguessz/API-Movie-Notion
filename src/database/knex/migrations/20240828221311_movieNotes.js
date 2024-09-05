
exports.up = (knex) => {
    return knex.schema.createTable("movie_notes", (table) => {
        table.increments("id");
        table.text("title");
        table.text("description");
        table.integer("rating");
        //If the reference user is deleted, it automatically deletes the movie notion
        table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
        table.timestamp("created_at").default(knex.fn.now())
        table.timestamp("updated_at").default(knex.fn.now())
    })
}


exports.down = (knex) => {
    return knex.schema.dropTable("movie_notes")
}
