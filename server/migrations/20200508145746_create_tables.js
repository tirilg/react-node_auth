exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id');
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('email').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        
        .createTable('goals', (table) => {
            table.increments('id');
            table.string('goal').notNullable();
            table.string('description');
            table.string('completed').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.integer('user_id').unsigned().notNullable();
            
            table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('goals')
        .dropTableIfExists('users');
};

