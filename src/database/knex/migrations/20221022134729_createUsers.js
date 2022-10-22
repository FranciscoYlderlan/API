
export function up(knex)  { return knex.schema.createTable('users', table => {
        table.increments('id').unsigned().primary();
        table.string('name').notNull();
        table.string('email').nullable();
        table.string('password').nullable();
        table.string('avatar');
        table.timestamp('created_at').default(knex.fn.now());
        table.timestamp('updated_at').default(knex.fn.now());
    });     
}




export function down(knex) { return knex.schema.dropTable('users'); }
