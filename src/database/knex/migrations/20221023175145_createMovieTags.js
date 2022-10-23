export function up(knex) { 
    return knex.schema.createTable('MovieTags', table => {
        table.increments('id').unsigned().primary();
        table.string('name').notNull();
        table.integer('note_id').notNullable().references("id").inTable("MovieNotes").onDelete("CASCADE");
    });     
}

export function down(knex) { 
    return knex.schema.dropTable('MovieTags'); 
}