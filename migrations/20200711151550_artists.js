
exports.up = function(knex) {
    return knex.schema.createTable('Artists', table => {
        table.increments()
        table.string('name')
        table.string('genre')
        table.timestamp("created_at").defaultTo(knex.fn.now());
    }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('Artists');
};
