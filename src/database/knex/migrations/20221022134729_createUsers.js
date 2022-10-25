
export function up(knex) { 
    return knex.schema.createTable('Users', table => {
        table.increments('id').unsigned().primary();
        table.string('name').notNull();
        table.string('email').notNull();
        table.string('password').notNull();
        table.string('avatar').nullable();
        table.timestamp('created_at').default(knex.fn.now());
        table.timestamp('updated_at').default(knex.fn.now());
    });     
}

export function down(knex) { 
    return knex.schema.dropTable('Users'); 
}
