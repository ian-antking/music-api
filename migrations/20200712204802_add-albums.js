
exports.up = function(knex) {
    return knex.schema
        .createTable('Albums', album => {
            album.increments().primary()
            album.string('name')
            album.integer('year')
            album.integer('artist_id')
                .references('id')
                .inTable('Artists')
                .notNull()
                .unsigned()
            album.timestamp("created_at").defaultTo(knex.fn.now());
            
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('Albums')
    .dropTable('Artists');
};
