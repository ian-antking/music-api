
exports.up = function(knex) {
    return knex.schema.createTable('artists', table => {
        table.increments()
        table.string('name')
        table.string('genre')
    }) 
};

exports.down = function(knex) {
  
};
