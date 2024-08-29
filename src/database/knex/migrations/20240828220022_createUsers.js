//Up - Method to create or change the database structure.
exports.up = (knex) => {
    return knex.schema.createTable("users", (table) => {
        // Table Columns
        table.increments("id");
        table.text("name");
        table.text("email");
        table.text("password");
        table.text("avatar");
        table.timestamp("created_at").default(knex.fn.now())
        table.timestamp("updated_at").default(knex.fn.now())
    })
};

exports.down = (knex) => {
    return knex.schema.dropTable("users");
}
